import { readUserDatabase, saveUserDatabase } from "./userDatabaseModel.js";

export function registerPatient(user) {
    const userDatabase = readUserDatabase();
    const userId = (userDatabase.users.length + 1).toString();

    const newUser = {
        ...user, 
        id: userId
    }

    userDatabase.users.push(newUser);
    saveUserDatabase(userDatabase);
}

export function isPatientRegistered(phone) {
    const database = readUserDatabase();
    const duplicatePhoneCheck = database.users.find(user => user.phone === phone);

    if (duplicatePhoneCheck) {
        return true;
    } else {
        return false;
    }
}
