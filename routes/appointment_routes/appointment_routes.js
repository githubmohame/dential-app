import express from 'express';
import { getAllAppointmentsDay, getAllAppointmentsMonth, createAppointment, getAvailableTimes,getUserAppointmentsController,cancelAppointment} from '../../controllers/appointment.controller.js';

const router = express.Router();



router.get('/appointments/available-times/:year/:month/:day', getAvailableTimes);
router.get('/appointments/:year/:month/:day', getAllAppointmentsDay);
router.get('/appointments/:year/:month', getAllAppointmentsMonth);
router.post('/appointments', createAppointment);
router.get('/appointments/user/:userId', getUserAppointmentsController);
router.delete('/appointments/cancel', cancelAppointment);



export default router;
