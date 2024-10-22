import { Appointment } from '../models/appointment.model.js';
import { findBookedTimes, createNewAppointment, checkTimeConflict } from '../repositories/appointment.rep.js';
import { findAllAppointments } from '../repositories/appointment.rep.js';
import { getUserAppointments } from '../repositories/appointment.rep.js';
import { deleteAppointmentById } from '../repositories/appointment.rep.js';




export async function getAllAppointments(req, res) {
  const { year, month, day } = req.params;

  try {
    const appointments = await findAllAppointments(year, month, day);

    if (!appointments || appointments.length === 0) {
      return res.status(404).json({ message: 'No appointments found for the specified day.' });
    }

    res.status(200).json({
      message: 'All appointments for the specified day.',
      appointments: appointments
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}



export async function createAppointment(req, res) {
  const { year, month, day, timeSlot, user, admin, service, cost, duration } = req.body;

  try {
    if (!allPossibleTimeSlots.includes(timeSlot)) {
      return res.status(400).json({ message: `Such appointment doesn't exist` });
    }

    const hasConflict = await checkTimeConflict(year, month, day, timeSlot);

    if (hasConflict) {
      return res.status(400).json({ message: `this appointment already booked` });
    }

    const newAppointment = await createNewAppointment({
      year, month, day, timeSlot, user, admin, service, cost, duration
    });

    const updatedAppointment = await Appointment.findOneAndUpdate(
      {
        "bookedTimes.year": year,
        "bookedTimes.month": month,
        "bookedTimes.day": day
      },
      {
        $addToSet: { "bookedTimes.times": timeSlot } // Add the timeSlot to bookedTimes
      },
      {
        new: true, // Return the updated document
        upsert: true // Create a new document if it doesn't exist
      }
    );

    res.status(201).json({
      message: "Appointment created successfully",
      appointment: newAppointment,
      updatedBookedTimes: updatedAppointment.bookedTimes
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating appointment" });
  }
}



const allPossibleTimeSlots = [
  '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', 
  '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', 
  '05:00 PM', '06:00 PM'
];

export async function getAvailableTimes(req, res) {
  const { year, month, day } = req.params;

  try {
    const appointment = await Appointment.findOne({
      "bookedTimes.year": year,
      "bookedTimes.month": month,
      "bookedTimes.day": day
    });

    let bookedTimes = [];

    if (appointment) {
      bookedTimes = appointment.bookedTimes.times;
    }

    const availableTimes = allPossibleTimeSlots.filter(
      timeSlot => !bookedTimes.includes(timeSlot)
    );

    res.status(200).json({
      message: 'Available times for the specified day.',
      availableTimes: availableTimes
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}


export async function getUserAppointmentsController(req, res) {
  const { userId } = req.params;  
  console.log('User ID:', userId); 


  try {
    const appointments = await getUserAppointments(userId);
    console.log('Appointments:', appointments); 
    if (!appointments || appointments.length === 0) {
      return res.status(404).json({ message: "No appointments found for this user" });
    }
    res.status(200).json({ appointments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching user appointments' });
  }
}
export async function cancelAppointment(req, res) {
  const { appointmentId } = req.body;  

  try {
    const deletedAppointment = await deleteAppointmentById(appointmentId);

    if (!deletedAppointment) {
      return res.status(404).json({ message: 'Appointment not found or already canceled' });
    }

    res.status(200).json({ message: 'Appointment successfully canceled', deletedAppointment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error canceling appointment' });
  }
}

