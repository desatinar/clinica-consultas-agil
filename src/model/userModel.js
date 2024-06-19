import { readDatabase, saveDatabase } from "./databaseModel.js";

export function registerPatient(user){
    const newUser = {...user, appointment: {date: null, time: null, specialty: null}};
    const data = readDatabase();
    data.users.push(newUser);

    saveDatabase(data);
}

export function isPatientRegistered(phone){
    const database = readDatabase();
    const duplicatePhoneCheck = database.users.find(user => user.phone === phone);

    if(duplicatePhoneCheck){
        return true;
    } else {
        return false;
    }
}
