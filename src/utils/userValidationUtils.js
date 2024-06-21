import { readUserDatabase } from "../model/userDatabaseModel.js";

export function validateUserId(userId){
    const database = readUserDatabase();
    const user = database.users.find(user => user.id === userId);
    const result = user ? true : false;
    return result;
}

export function checkUsersExist(){
    const database = readUserDatabase();
    const users = database.users;
    return users.length > 0;
}

export function isPhoneNumberValid(phone){
    return !isNaN(phone);
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