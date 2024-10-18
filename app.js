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

mongoose
  .connect("mongodb://localhost/dentalDatabase", {})
  .then(() => {
    console.log("Connected to MongoDB");
    let userRouter = UserRouterFun(User, UserController, UserRepos);
    let adminRouter = AdminRouterFun(Admin, AdminController, AdminRepos);
    const app = express();
    const upload = multer();
    app.use(upload.fields([]));
    app.use(express.json());
    app.use("/", userRouter);
    app.use("/", adminRouter);
    function errorHandler(err, req, res, next) {
      console.log(err.message);
      res.status(err.res.status);
      res.send({ error: err.res.msgUser });
      //res.send({error:""});
    }
    app.use(errorHandler);
    app.listen(3000, () => {
      console.log("tell me go");
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });