import * as fs from "fs";

export function readDatabase(){
    try{
        const database = fs.readFileSync("users.json", "utf8");
        return JSON.parse(database);
    } catch(err){
        console.log("Erro ao ler a database", err);
    }
}

export function saveDatabase(data){
    try {
        fs.writeFileSync("users.json", JSON.stringify(data, null, 2), "utf8");
    } catch (err) {
        console.log("Erro ao salvar no database", err);
    }
}