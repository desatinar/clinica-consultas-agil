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
