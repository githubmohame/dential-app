import  {Appointment}  from '../models/appointment.model.js';
import {Booking} from '../models/booking.model.js';

export async function findBookedTimes(year, month, day) {
  try {
    return await Appointment.findOne({
      "bookedTimes.year": year,
      "bookedTimes.month": month,
      "bookedTimes.day": day
    });
  } catch (error) {
    throw new Error('Error fetching booked times: ' + error.message);
  }
}

export async function createNewAppointment({ year, month, day, timeSlot, user, admin, service, cost, duration }) {
  try {
    const newAppointment = new Appointment({
      months: {
        year: year,
        month: month,
        days: {
          day: day,
          times: {
            timeSlot: timeSlot,
            appointment: { user, admin, service, cost, duration }
          }
        }
      },
      bookedTimes: {
        year: year,
        month: month,
        day: day,
        times: [timeSlot]  
      }
    });
        
       const nappointment =  await newAppointment.save();
       const appointmentId = nappointment._id;
       const newbooking = new Booking({ appointmentId,user, admin, service, cost, duration, date: `${year}-${month}-${day}-${timeSlot}` })
        await newbooking.save();
        return nappointment
       
  } catch (error) {
    throw new Error('Error creating appointment: ' + error.message);
  }
}

export async function checkTimeConflict(year, month, day, timeSlot) {
  try {
    const existingAppointment = await findBookedTimes(year, month, day);
    
    if (existingAppointment && existingAppointment.bookedTimes.times.includes(timeSlot)) {
      return true; 
    }
    
    return false;  
  } catch (error) {
    throw new Error('Error checking time conflict: ' + error.message);
  }
}



export async function findAllAppointments(year, month, day) {
  try {
    return await Appointment.find({
      "months.year": year,
      "months.month": month,
      "months.days.day": day
    });
  } catch (error) {
    throw new Error('Error fetching appointments: ' + error.message);
  }
}


export async function getUserAppointments(userId) {
  try {
    return await Booking.find({ user : userId })
  
  } catch (error) {
    throw new Error('Error fetching user appointments: ' + error.message);
  }
}

export async function deleteAppointmentById(appointmentId) {
  try {
     await Booking.deleteOne({appointmentId});
     return await Appointment.findByIdAndDelete(appointmentId);

  } catch (error) {
    throw new Error('Error deleting appointment: ' + error.message);
  }
}

