import * as fs from "fs";

export function readAppointmentDatabase() {
    try {
        const database = fs.readFileSync("appointments.json", "utf8");
        return JSON.parse(database);
    } catch (err) {
        console.log("Erro ao ler a database de consultas", err);
    }
}

export function saveAppointmentDatabase(data){
    try {
        fs.writeFileSync("appointments.json", JSON.stringify(data, null, 2), "utf8");
    } catch (err) {
        console.log("Erro ao salvar no database de consultas", err);
    }
}