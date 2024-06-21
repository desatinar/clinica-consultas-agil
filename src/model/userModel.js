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
