import express from 'express';
import { getAllAppointmentsDay, getAllAppointmentsMonth, createAppointment, getAvailableTimes,getUserAppointmentsController,cancelAppointment} from '../../controllers/appointment.controller.js';
import CustomePasetoMiddleWare from '../../middlewares/toke_verify.middleware.js';
import CheckPermission from '../../middlewares/check_permission.js';
import TokenController from "../../controllers/token.controller.js"
import User  from '../../models/user.model.js';
import Admin from '../../models/admin.model.js';
import TokenRepos from "../../repositories/token.rep.js"
const AppointmentRoutes = express.Router();
AppointmentRoutes.use(async(req,res,next)=>{
    
    CustomePasetoMiddleWare(req, res, next, TokenController,User, Admin,TokenRepos)
  })
  AppointmentRoutes.use(async(req,res,next)=>{
    
    CheckPermission(req, res, next);
  });
AppointmentRoutes.use(CustomePasetoMiddleWare);
//public
//AppointmentRoutes.get('/available-times/:year/:month/:day', getAvailableTimes);
//admin;
AppointmentRoutes.get('day', getAllAppointmentsDay);
//admin;
AppointmentRoutes.get('/month', getAllAppointmentsMonth);
//both
AppointmentRoutes.post('/', createAppointment);
//user
AppointmentRoutes.get('/user/', getUserAppointmentsController);
//both
AppointmentRoutes.delete('/cancel', cancelAppointment);



export default AppointmentRoutes;
