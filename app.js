import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import AdminController from "./controllers/admin.controller.js";
import UserController from "./controllers/user.controller.js";
import logger from "./logger.js";
import Admin from "./models/admin.model.js";
import User from "./models/user.model.js";
import AdminRepos from "./repositories/admin.rep.js";
import UserRepos from "./repositories/user.rep.js";
import AdminRouterFun from "./routes/admin_routes/admin.route.js";
import UserRouterFun from "./routes/user_routes/user_routes.js";
import WorkDaysFunc from "./routes/workdays_routes/workdays.routes.js"
import WorkDays from "./models/work_days.model.js"
import WorkDaysRepos from "./repositories/work_days.rep.js";
import WorkDaysController from "./controllers/workdays.controller.js"
dotenv.config();
mongoose
  .connect("mongodb://127.0.0.1:27017/dentalDatabase", {})
  .then(() => {
    console.log("Connected to MongoDB");
    logger.info("Connected to MongoDB");
    let userRouter = UserRouterFun(User, UserController, UserRepos);
    let adminRouter = AdminRouterFun(Admin, AdminController, AdminRepos);
    let workDays=WorkDaysFunc(WorkDays,WorkDaysRepos, WorkDaysController)
    const app = express();
    const upload = multer();
    app.use(upload.fields([]));
    app.use(express.json());
    app.use("/", userRouter);
    app.use("/", adminRouter);
    app.use("/",workDays)
    function errorHandler(err, req, res, next) {
      console.log(err.message);
      logger.error(err.message);
      res.status(err.res.status);
      res.send({ error: err.res.msgUser });
      //res.send({error:""});
    }
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