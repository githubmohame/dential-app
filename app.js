import express from "express";
import multer from "multer";
import UserRouter from "./routes/user_routes/user_routes.js";
import UserRepos from "./repositories/user.rep.js";
import User from "./models/user.model.js";
import UserController from "./controllers/user.controller.js";
import UserRouterFun from "./routes/user_routes/user_routes.js";
let userRepos=UserRepos;
let userModel=User;
let userController=UserController;
let userRouter=UserRouterFun(userModel,userController,UserRepos);
const app=express();
const upload=multer();
app.use(upload.fields([]));
app.use(express.json());
app.use("/",userRouter);
function errorHandler (err, req, res, next) {
    res.status(err.res.status);
    res.send({error:err.res.msgUser});
}
app.use(errorHandler);
app.listen(3000,()=>{
    console.log("tell me go");
});
