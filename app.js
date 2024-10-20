import express from "express";
import Admin from "./models/admin.model.js";
import AdminRepos from "./repositories/admin.rep.js";
import AdminController from "./controllers/admin.controller.js";
import AdminRouterFun from "./routes/admin_routes/admin.route.js";
import multer from "multer";
import UserRepos from "./repositories/user.rep.js";
import User from "./models/user.model.js";
import UserController from "./controllers/user.controller.js";
import UserRouterFun from "./routes/user_routes/user_routes.js";
import mongoose from "mongoose";
import logger from "./logger.js";
import dotenv from "dotenv";
import ServiceRouterFun from "./routes/service_routes/service_routes.js";
import serviceModel from "./models/service.model.js";
import ServiceController from "./controllers/serviceController.js";
import ServiceRepo from "./repositories/serviceRepo.js";
dotenv.config();
mongoose
  .connect(process.env.CONNECTION_STRING, {})
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
