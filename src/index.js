import { input } from '@inquirer/prompts';
import { createPatient } from './controller/userController.js';
import { scheduleAppointment, cancelAppointment } from './controller/appointmentController.js';

async function menu(){
    let opt = '';
    do {
        console.log("Clínica de Consultas Ágil");
        console.log("1. Cadastrar paciente");
        console.log("2. Marcações de consultas");
        console.log("3. Cancelamento de consultas");
        console.log("0. Sair");

        const userInput = await input({ message: "Opção:" });
        opt = Number(userInput);
    
        switch(opt){
            case 1:
                console.log("\nCadastro de Paciente");
                await createPatient();
                break;
            case 2:
                console.log("\nMarcação de Consulta");
                await scheduleAppointment();
                break;
            case 3:
                console.log("\nCancelamento de Consultas");
                await cancelAppointment();
                break;
            case 0:
                console.log("\nFinalizando a operação...");
                break;
            default:
                console.log("\nOpção inválida");
        }
    } while(opt !== 0);
}

menu();