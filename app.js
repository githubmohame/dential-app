import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import AdminController from "./controllers/admin.controller.js";
import ServiceController from "./controllers/serviceController.js";
import UserController from "./controllers/user.controller.js";
import logger from "./logger.js";
import Admin from "./models/admin.model.js";
import serviceModel from "./models/service.model.js";
import User from "./models/user.model.js";
import AdminRepos from "./repositories/admin.rep.js";
import ServiceRepo from "./repositories/serviceRepo.js";
import UserRepos from "./repositories/user.rep.js";
import AdminRouterFun from "./routes/admin_routes/admin.route.js";
import ServiceRouterFun from "./routes/service_routes/service_routes.js";
import UserRouterFun from "./routes/user_routes/user_routes.js";
import nodemailer from "nodemailer"
dotenv.config();
mongoose
  .connect("mongodb://127.0.0.1:27017/dentalDatabase", {})
  .then(async() => {
    console.log("Connected to MongoDB");
    logger.info("Connected to MongoDB");
    let userRouter = UserRouterFun(User, UserController, UserRepos);
    let adminRouter = AdminRouterFun(Admin, AdminController, AdminRepos);
    let serviceRouter = ServiceRouterFun(
      serviceModel,
      ServiceController,
      ServiceRepo
    );
    const app = express();
    const upload = multer();
    app.use(upload.fields([]));
    app.use(express.json());
    app.use("/", userRouter);
    app.use("/", adminRouter);
    app.use("/", serviceRouter);
    function errorHandler(err, req, res, next) {
      console.log(err.message);
      logger.error(err.message);
      res.status(err.res.status);
      res.send({ error: err.res.msgUser });
      //res.send({error:""});
    }
    const port = process.env.port || 5000;
    const transporter =await nodemailer.createTransport({
      service: "Gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "trialmailer206@gmail.com",
        pass: "pdvfpsaooamwwrdh ",
      },
    });
    const mailOptions = {
      from: "mohammmedaymansoliman@gmail.com",
      to: "mohammmedayman5@gmail.com",
      subject: "Hello from Nodemailer",
      text: "This is a test email sent using Nodemailer.",
    };
    await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email: ", error);
      } else {
        console.log("Email sent: ", info.response);
      }
    });
    app.use(errorHandler);
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
      logger.info(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
    logger.error("Error connecting to MongoDB:", error);
  });
