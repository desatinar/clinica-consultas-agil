import * as fs from "fs";

export function readUserDatabase(){
    try{
        const database = fs.readFileSync("users.json", "utf8");
        return JSON.parse(database);
    } catch(err){
        console.log("Erro ao ler a database de usuários", err);
    }
}

export function saveUserDatabase(data){
    try {
        fs.writeFileSync("users.json", JSON.stringify(data, null, 2), "utf8");
    } catch (err) {
        console.log("Erro ao salvar no database", err);
    }
}