import { readAppointmentDatabase, saveAppointmentDatabase } from "./appointmentDatabaseModel.js";


export function createAppointment(appointment){
    const appointmentDabase = readAppointmentDatabase();
    const appointmentId = (appointmentDabase.appointments.length + 1).toString();

    const newAppointment = {
        ...appointment,
        id: appointmentId,
    }

    appointmentDabase.appointments.push(newAppointment);
    saveAppointmentDatabase(appointmentDabase);
}