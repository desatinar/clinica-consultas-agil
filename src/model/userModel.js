import { readDatabase, saveDatabase } from "./databaseModel.js";

export function registerPatient(user) {
    const data = readDatabase();
    const userId = (data.users.length + 1).toString();
    const appointmentId = Math.floor(Math.random() * 1000);

    const newUser = {
        ...user, 
        id: userId, 
        appointments: [
            {
                id: appointmentId.toString(),
                date: null, 
                time: null, 
                specialty: null
            }
        ],
    }

    data.users.push(newUser);
    saveDatabase(data);
}

export function isPatientRegistered(phone) {
    const database = readDatabase();
    const duplicatePhoneCheck = database.users.find(user => user.phone === phone);

    if (duplicatePhoneCheck) {
        return true;
    } else {
        return false;
    }
}
