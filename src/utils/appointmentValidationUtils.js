import { readAppointmentDatabase } from "../model/appointmentDatabaseModel.js";

export function validateDate(date){
    const datePattern = /^(0?[1-9]|[12][0-9]|3[01])[\/](0?[1-9]|1[012])[\/](19|20)\d\d$/

    const isDateValid = datePattern.test(date);
    return isDateValid;
}

export function isDateGraterThanToday(date){
    const appointmentDateParts = date.split("/");
    const appointmentDate = new Date(appointmentDateParts[2], appointmentDateParts[1] - 1, appointmentDateParts[0]);
    const today = new Date();
    appointmentDate.setUTCHours(0, 0, 0, 0);
    today.setUTCHours(0, 0, 0, 0);

    const result = appointmentDate >= today;
    return result;
}

export function validateTime(time){
    const timePattern = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;

    const isTimeValid = timePattern.test(time);
    return isTimeValid;
}

export function isTimeAndDateAvailables(time, date){
    const database = readAppointmentDatabase();
    const appointments = database.appointments;

    const isAvailable = appointments.filter(appointment => appointment.date === date && appointment.time === time);
    return !isAvailable.length > 0;
}

export function validateAppointmentId(id){
    const database = readAppointmentDatabase();
    const appointments = database.appointments;

    const appointmentExists = appointments.find(appointment => appointment.id === id);
    return appointmentExists ? true : false;
}

export function checkAppointmentsExist(){
    const database = readAppointmentDatabase();
    const appointments = database.appointments;
    return appointments.length > 0;
}