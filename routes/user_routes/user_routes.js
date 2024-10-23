import { Router } from "express";

//import User from "../../models/user.model.js";
function UserRouterFun(User,UserController,userRepos,CustomePasetoMiddleWare,CheckPermission, TokenController, adminModel,tokenRepos){
    const UserRouter=Router();
    UserRouter.post("/",async function(req,res,next){
      let result=await new UserController(next,userRepos,User).createUser(req.body.email,req.body.password,req.body.name,req.body.phone);
      if(result){
       res.send({"res":"done"});
      }
    
   });
   UserRouter.use(async(req,res,next)=>{
    
      CustomePasetoMiddleWare(req, res, next, TokenController,User, adminModel,tokenRepos)
    })
    UserRouter.use(async(req,res,next)=>{
      
      CheckPermission(req, res, next);
    });
    //user
    UserRouter.get("/",async function(req,res,next){
        try{
         let u;
         if(req.headers.id){
            u=await new UserController(next,userRepos,User).getUserById(req.headers.id);
         }
         else{
            u=await new UserController(next,userRepos,User).getUserByEmail(req.headers.email);
         }
         console.log(u)
         console.log("go to poll");
         
         res.send(u);
        }
        catch(e){
         console.log(e.message);
        }
     });
     //both
    
     //user
     UserRouter.delete("/",function(req,res,next){
      let result=new UserController(next,userRepos,User).deleteUser(req.headers.email);
      if(result){
         res.send({"res":"done"})
      }
     });
     //user
     UserRouter.put("/",async function(req,res,next){
      let result=await new UserController(next,userRepos,User).updateUser(req.headers.email,req.body,)
      console.log(result)
     if(result){      
      res.send({"res":"done"});
     }
    
     });
     return UserRouter;
}
export default UserRouterFun;