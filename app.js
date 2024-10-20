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
dotenv.config();
mongoose
  .connect(process.env.CONNECTION_STRING, {}) //"mongodb://127.0.0.1:27017/dentalDatabase"
  .then(() => {
    console.log("Connected to MongoDB");
    logger.info("Connected to MongoDB");
    let userRouter = UserRouterFun(User, UserController, UserRepos);
    let adminRouter = AdminRouterFun(Admin, AdminController, AdminRepos);
    let serviceRouter = ServiceRouterFun(
      serviceModel,
      ServiceController,
      ServiceRepo
    );
    let reviewRouter = ReviewRouterFun(Review);
    let workdaysRouter = WorkDaysFunc(WorkDaysController);
    const app = express();
    const upload = multer();
    app.use(upload.fields([]));
    app.use(express.json());
    app.use("/", userRouter);
    app.use("/", adminRouter);
    app.use("/", serviceRouter);
    app.use("/", reviewRouter);
    app.use("/", workdaysRouter);
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
