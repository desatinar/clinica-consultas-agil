import { input } from '@inquirer/prompts';
import { readUserDatabase, saveUserDatabase } from "../model/userDatabaseModel.js";
import { checkUsersExist, validateUserId } from '../utils/userValidationUtils.js';
import { checkAppointmentsExist, isDateGraterThanToday, isTimeAndDateAvailables, validateAppointmentId, validateDate, validateTime } from '../utils/appointmentValidationUtils.js';
import { createAppointment } from '../model/appointmentModel.js';
import { readAppointmentDatabase, saveAppointmentDatabase } from '../model/appointmentDatabaseModel.js';

export async function scheduleAppointment() {
    const usersDatabase = readUserDatabase();
    const users = usersDatabase.users;

    if(!checkUsersExist()){
        console.log("\nSem pacientes cadastrados. Cadastre um antes de marcar uma consulta\n");
        return;
    }

    console.log("\nDigite o número do paciente para marcação\n");
    for (const user of users) {
        console.log(`Número do paciente: ${user.id}\nNome: ${user.name}\nContato: ${user.phone}`);
        console.log("-".repeat(25));
    }

    const userId = await input({ message: "Número do paciente:" });

    if (!validateUserId(userId)) {
        console.log("\nPaciente não encontrado.\n");
        return;
    }

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

    const newAppointment = {
        date: appointmentDate,
        time: appointmentTime,
        specialty: appointmentSpecialty,
        userId,
    };

    createAppointment(newAppointment);
    console.log("\nConsulta Marcada\n");
}

export async function cancelAppointment() {
    const appointmentsDatabase = readAppointmentDatabase();
    const appointments = appointmentsDatabase.appointments;
    const usersDatabase = readUserDatabase();
    const users = usersDatabase.users;

    if(!checkAppointmentsExist()){
        console.log("\nSem consultas cadastradas. Cadastre uma antes.\n");
        return;
    }

    console.log("\nConsultas agendadas: ");
    appointments.forEach(appointment => console.log(`Número da consulta: ${appointment.id}`));

    console.log("");
    const appointmentCancellationId = await input({ message: "Número da consulta:"});

    if (!validateAppointmentId(appointmentCancellationId)) {
        console.log("\nConsulta não encontrada\n");
        return;
    }

    const appointmentToCancel = appointments.find(appointment => appointment.id === appointmentCancellationId);
    const cancelledAppointmentUser = users.find(user => appointmentToCancel.userId === user.id);

    console.log("\nDetalhes da consulta: ");
    console.log(`\nNúmero do paciente: ${cancelledAppointmentUser.id}`);
    console.log(`Nome do paciente: ${cancelledAppointmentUser.name}`);
    console.log(`Telefone do paciente: ${cancelledAppointmentUser.phone}`);
    console.log(`Especialidade marcada: ${appointmentToCancel.specialty}`);
    console.log(`Data marcada: ${appointmentToCancel.date}`);
    console.log(`Hora marcada: ${appointmentToCancel.time}`);
    console.log(`Número da consulta: ${appointmentToCancel.id}`);
    console.log("\nConfirma o concelamento?\nDigite 1 para sim\nDigite 2 para não");

    const cancelOption = await input({ message: "Opção:" });

    switch (cancelOption) {
        case "1":
            const updatedAppointments = appointments.filter(appointment => appointment.id !== appointmentCancellationId);
            const updatedDatabase = {
                appointments: updatedAppointments
            }
            saveAppointmentDatabase(updatedDatabase);
            console.log("\nConsulta desmarcada!\n");
            break;
        case "2":
            console.log("\nDesmarcação de consulta cancelada\n");
            return;
        default:
            console.log("\nOpção inválida\n");
            return;
    }
}