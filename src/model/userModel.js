import { readDatabase, saveDatabase } from "./databaseModel.js";

export function registerPatient(user){
    const data = readDatabase();
    const userId = (data.users.length + 1).toString();
    const newUser = {...user, id: userId, appointment: {date: null, time: null, specialty: null}};
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
