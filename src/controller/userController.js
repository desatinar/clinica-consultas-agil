import { input } from '@inquirer/prompts';
import { registerPatient } from '../model/userModel.js';
import { isPhoneNumberValid, isPatientRegistered } from '../utils/userValidationUtils.js';

export async function createPatient(){
    const user = {
        name: await input({message: "Informe o nome do usuário:"}),
        phone: await input({message: "Informe o telefone do usuário:"}),
    };

    if(!isPhoneNumberValid(user.phone)){
        console.log("\nTelefone só pode conter números\n");
        return;
    }

    if(isPatientRegistered(user.phone)){
        console.log("\nPaciente já cadastrado!\n");
    } else {
        registerPatient(user);
        console.log("\nPaciente cadastrado com sucesso\n");
    }
}