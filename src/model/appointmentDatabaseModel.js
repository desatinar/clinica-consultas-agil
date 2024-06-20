import * as fs from "fs";

export function readAppointmentDatabase() {
    try {
        const database = fs.readdirSync("appointments.json", "utf8");
        return JSON.parse(database);

    } catch (err) {
        console.log("Erro ao ler a database de consultas", err);
    }
}