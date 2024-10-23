import dotenv from "dotenv";
import express from "express";
import Admin from "./models/admin.model.js";
import AdminRepos from "./repositories/admin.rep.js";
import AdminController from "./controllers/admin.controller.js";
import ServiceController from "./controllers/serviceController.js";
import UserController from "./controllers/user.controller.js";
import UserRouterFun from "./routes/user_routes/user_routes.js";
import mongoose from "mongoose";
import AdminRouterFun from "./routes/admin_routes/admin.route.js";
import User from "./models/user.model.js";
import logger from "./logger.js";
import ServiceRouterFun from "./routes/service_routes/service_routes.js";
import UserRepos from "./repositories/user.rep.js";
import serviceModel from "./models/service.model.js";
import ServiceRepo from "./repositories/serviceRepo.js";
import nodemailer from "nodemailer";
import multer from "multer";
import Review from "./models/review.model.js";
import ReviewRouterFun from "./routes/review_routes/review_routes.js";
import WorkDaysFunc from "./routes/workdays_routes/workdays.routes.js";
import WorkDaysController from "./controllers/workdays.controller.js";
import AppointmentRoutes from "./routes/appointment_routes/appointment_routes.js";
import CustomePasetoMiddleWare from "./middlewares/toke_verify.middleware.js";
import TokenController from "./controllers/token.controller.js";
import CheckPermission from "./middlewares/check_permission.js";
import TokenRepos from "./repositories/token.rep.js";
import TokenRouteFunc from "./routes/token_routes/token.routes.js";
import { BasicAuthMiddleware } from "./middlewares/basic_auth_middleware.js";
import Token from "./models/token.model.js";

dotenv.config();
mongoose
  .connect('mongodb://127.0.0.1:27017/dentalDatabase', {}) //"mongodb://127.0.0.1:27017/dentalDatabase"
  .then(() => {
    console.log("Connected to MongoDB");
    logger.info("Connected to MongoDB");
    let userRouter = UserRouterFun(User, UserController, UserRepos,CustomePasetoMiddleWare,CheckPermission,TokenController,Admin,TokenRepos);
    let adminRouter = AdminRouterFun(Admin, AdminController, AdminRepos,CustomePasetoMiddleWare,CheckPermission,TokenController,User,TokenRepos);
    let serviceRouter = ServiceRouterFun(
      serviceModel,
      CustomePasetoMiddleWare,CheckPermission,
      TokenController,User,Admin,TokenRepos    
    );
    let reviewRouter = ReviewRouterFun(Review,CustomePasetoMiddleWare,CheckPermission,TokenController,User,Admin,TokenRepos);
    let workdaysRouter = WorkDaysFunc(WorkDaysController,CheckPermission,CheckPermission, TokenController,User,Admin,TokenRepos);
    let tokenRoute=TokenRouteFunc(User, Admin,TokenRepos,TokenController,Token,BasicAuthMiddleware,AdminRepos,UserRepos);
    let appointmentRoutes=AppointmentRoutes;
    const app = express();
    const upload = multer();
    app.use(upload.fields([]));
    app.use(express.json());
    app.use("/user", userRouter);
    app.use("/admin", adminRouter);
    app.use("/token",tokenRoute);
    app.use("/services", serviceRouter);
    app.use("/review", reviewRouter);
    app.use("/workdays", workdaysRouter);
    app.use("/appointments",appointmentRoutes)
    //app.use("/", appointmentRoutes);
    function errorHandler(err, req, res, next) {
      console.log(err.message);
      logger.error(err.message);
      res.status(err.res.status);
      res.send({ error: err.res.msgUser });
      //res.send({error:""});
    }
    const transporter = nodemailer.createTransport({
      port: 465, // true for 465, false for other ports
      host: "smtp.gmail.com",
      auth: {
        user: process.env.TRAIL_MAIL,
        pass: process.env.TRAIL_PASS,
      },
      secure: true,
    });
    const port = process.env.port || 5000;
    app.use(errorHandler);
    app.listen(3000, () => {
      console.log("tell me go");
      logger.info("Server is running on port 3000");
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
    logger.error("Error connecting to MongoDB:", error);
  });

//Error connecting to MongoDB: Error: querySrv ESERVFAIL _mongodb._tcp.reservationsystem.iww97.mongodb.net
