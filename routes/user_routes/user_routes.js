import { Router } from "express";
import UserController from "../../controllers/user.controller.js";

//import User from "../../models/user.model.js";
function UserRouterFun(User,UserController,userRepos){
    const UserRouter=Router();
    UserRouter.get("/user",async function(req,res,next){
        new UserController(next,userRepos,User).createUser(req.email);
     });
     
     UserRouter.post("/user",function(req,res,next){
        //email,password,name ,phone
        new UserController(next,userRepos,User).createUser(req.email,req.password,req.name,req.phone);
        try{
         res.send({"tell":"iii"});
        }
        catch(err){
     
        }
     
     });
     UserRouter.put("/user",function(res,req){
     
     });
     
     UserRouter.delete("/user",function(res,req){
     
     });
     return UserRouter;
}
export default UserRouterFun;