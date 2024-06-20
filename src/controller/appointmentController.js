import { input } from '@inquirer/prompts';
import { readDatabase, saveDatabase } from "../model/databaseModel.js";
import { isDateGraterThanToday, isTimeAndDateAvailables, validateDate, validateTime, validateUserId, validateAppointmentId } from '../utils/validationUtils.js';

export async function scheduleAppointment() {
    const database = readDatabase();
    const users = database.users;

    console.log("\nDigite o número do paciente para marcação\n");
    for (const user of users) {
        console.log(`Número do paciente: ${user.id}\nNome: ${user.name}\nContato: ${user.phone}`);
        console.log("-".repeat(25));
    }

    const opt = await input({ message: "Opção:" });

    if (!validateUserId(opt)) {
        console.log("\nPaciente não encontrado.\n");
        return;
    }

    const user = users.find(user => user.id === opt);

    const appointmentDate = await input({ message: "Qual a data você deseja marcar? Formato aceito: DD/MM/AAAA" });

    if (!validateDate(appointmentDate)) {
        console.log("\nData inválida\n");
        return;
    }

    if (!isDateGraterThanToday(appointmentDate)) {
        console.log("\nConsultas não podem ser marcadas antes da data atual.\n");
        return;
    }

    const appointmentTime = await input({ message: "Em qual horário você deseja marcar? Formato aceito: HH:MM" });

    if (!validateTime(appointmentTime)) {
        console.log("\nFormato do horário inválido");
        return;
    }

    if (!isTimeAndDateAvailables(appointmentTime, appointmentDate)) {
        console.log("\nHorário para essa data não disponível\n");
        return;
    }

    const appointmentSpecialty = await input({ message: "Qual especialidade médica" });

    const userIndex = (opt - 1).toString();
    const validAppointments = user.appointments.filter(appointment => appointment.time !== null);
    const appointmentId = Math.floor(Math.random() * 1000);

    const newUserInfo = {
        ...user,
        appointments: [
            ...validAppointments,
            {
                id: appointmentId.toString(),
                date: appointmentDate,
                time: appointmentTime,
                specialty: appointmentSpecialty,
            }
        ]
    };

    database.users.splice(userIndex, 1, newUserInfo);
    saveDatabase(database);

    console.log("\nConsulta Marcada\n");
}

export async function cancelAppointment() {
    const database = readDatabase();
    const users = database.users;
    let userToCancelAppointment = {};
    let appointments = [];

    console.log("\nConsultas agendadas: ");
    for (const user of users) {
        for (const appointment of user.appointments) {
            if (appointment.date !== null) {
                userToCancelAppointment = { ...user };
                appointments.push(appointment);
                console.log(`Nome do paciente: ${user.name}`);
                console.log(`Especialidade marcada: ${appointment.specialty}`);
                console.log(`Número da consulta: ${appointment.id}\n`);
            }
        }
    }

    console.log("Digite o número do consulta");
    const appointmentCancellationId = await input({ message: "Opção:" });

    if (!validateAppointmentId(appointmentCancellationId)) {
        console.log("\nConsulta não encontrada\n");
        return;
    }

    const appointmentToCancel = appointments.find(appointment => appointment.id === appointmentCancellationId);

    console.log("\nDetalhes da consulta: ");
    console.log(`\nNúmero do paciente: ${userToCancelAppointment.id}`);
    console.log(`Nome do paciente: ${userToCancelAppointment.name}`);
    console.log(`Telefone do paciente: ${userToCancelAppointment.phone}`);
    console.log(`Especialidade marcada: ${appointmentToCancel.specialty}`);
    console.log(`Data marcada: ${appointmentToCancel.date}`);
    console.log(`Hora marcada: ${appointmentToCancel.time}`);
    console.log(`Número da consulta: ${appointmentToCancel.id}`);

    console.log("\nConfirma o concelamento?\nDigite 1 para sim\nDigite 2 para não");

    const cancelOption = await input({ message: "Opção:" });

    switch (cancelOption) {
        case "1":
            const activeAppointments = appointments.filter(appointment => appointment.id !== appointmentToCancel.id);
            const updatedAppointmentCancellationDetails = {
                ...userToCancelAppointment,
                appointments: activeAppointments,
            };
            const userIndex = Number(userToCancelAppointment.id) - 1.
            database.users.splice(userIndex, 1, updatedAppointmentCancellationDetails);
            saveDatabase(database);
            console.log("\nConsulta desmarcada\n");
            break;
        case "2":
            console.log("\nDesmarcação de consulta cancelada");
            return;
        default:
            console.log("\nOpção inválida");
            return;
    }

}