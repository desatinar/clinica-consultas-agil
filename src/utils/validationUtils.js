import { readDatabase } from "../model/databaseModel.js";

export function validateUserId(userId){
    const database = readDatabase();
    const user = database.users.find(user => user.id === userId);

    const result = user ? true : false;

    return result;
}

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
    const database = readDatabase();
    const users = database.users;

    let result = true;
    for(const user of users){
        for(const appointment of user.appointments){
            if(appointment.time === time && appointment.date === date){
                result = false;
            }
        }
    }

    return result;
}

export function validateAppointmentId(id){
    const database = readDatabase();
    const users = database.users;

    let result = false;
    for(const user of users){
        for(const appointment of user.appointments){
            if(appointment.id === id){
                result = true;
            }
        }
    }

    return result;
}