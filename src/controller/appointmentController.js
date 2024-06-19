import { input } from '@inquirer/prompts';
import { readDatabase, saveDatabase } from "../model/databaseModel.js";
import { isDateGraterThanToday, isTimeAndDateAvailables, validateDate, validateTime, validateUserId } from '../utils/validationUtils.js';

export async function scheduleAppointment() {
        const database = readDatabase();
        const users = database.users.map((user, index) => {
            return {...user, id: (index + 1).toString()};
        });

        console.log("\nDigite o número do paciente para marcação\n");
        for (const user of users) {
            console.log(`${user.id}. ${user.name}\nContato: ${user.phone}`);
            console.log("-".repeat(25));
        }

        const opt = await input({ message: "Opção:" });

        if(!validateUserId(opt)){
            console.log("\nPaciente não encontrado.\n");
            return;
        }

        const appointmentDate = await input({ message: "Qual a data você deseja marcar? Formato aceito: DD/MM/AAAA" });

        if(!validateDate(appointmentDate)){
            console.log("\nData inválida\n");
            return;
        }

        if(!isDateGraterThanToday(appointmentDate)){
            console.log("\nConsultas não podem ser marcadas antes da data atual.\n");
            return;
        }

        const appointmentTime = await input({ message: "Em qual horário você deseja marcar? Formato aceito: HH:MM" });
        
        if(!validateTime(appointmentTime)){
            console.log("\nFormato do horário inválido");
            return;
        }
        
        if(!isTimeAndDateAvailables(appointmentTime, appointmentDate)){
            console.log("\nHorário para essa data não disponível\n");
            return;
        }

        const appointmentSpecialty = await input({ message: "Qual especialidade médica" });
        
        const userIndex = (opt - 1).toString();
        const newUserInfo = {
            ...validUser, appointment: {
                date: appointmentDate,
                time: appointmentTime,
                specialty: appointmentSpecialty,
            }
        };
        
        database.users.splice(userIndex, 1, newUserInfo);
        saveDatabase(database);

        console.log("\nConsulta Marcada\n");
}

export async function cancelAppointment(){
    const database = readDatabase();

    console.log("\nEscolha a consulta a ser desmarcada");
    database.users.forEach((user) => {
        if(user.appointment.date !== null){
            console.log(`\n${user.id}. Paciente: ${user.name}`)
            console.log(`Especialidade: ${user.appointment.specialty}`);
            console.log(`Dia: ${user.appointment.date}`);
            console.log(`Hora: ${user.appointment.time}`);
        }
    });

    const appointmentCancellationUserId = await input({message: "Opção:"});

    if(!validateUserId(appointmentCancellationUserId)){
        console.log("\nPaciente não encontrado\n");
        return;
    }

    const user = database.users.find(user => user.id === appointmentCancellationUserId);
    const updatedAppointmentCancellationDetails = {
        ...user,
        appointment: {
            date: null,
            time: null,
            specialty: null,
        }
    };

    const userIndex = database.users.findIndex(user => user.id === appointmentCancellationUserId);

    database.users.splice(userIndex, 1, updatedAppointmentCancellationDetails);
    saveDatabase(database);

    console.log("\nConsulta desmarcada\n");
}