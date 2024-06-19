import { input } from '@inquirer/prompts';
import { isPatientRegistered, registerPatient } from '../model/userModel.js';

export async function createPatient(){
    const user = {
        name: await input({message: "Informe o nome do usuário:"}),
        phone: await input({message: "Informe o telefone do usuário:"}),
    };

    if(isPatientRegistered(user.phone)){
        console.log("\nPaciente já cadastrado!\n");
    } else {
        registerPatient(user);
        console.log("\nPaciente cadastrado com sucesso\n");
    }
}