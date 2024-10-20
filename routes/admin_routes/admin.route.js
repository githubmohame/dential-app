import { Router } from "express";
function AdminRouterFun(admin,adminController,adminRepos){
   const AdminRouter=Router();
   
   AdminRouter.get("/admin",async function(req,res,next){
       try{
        let u;
        if(req.headers.id){
           u=await new adminController(next,adminRepos,admin).getAdminById(req.headers.id);
        }
        else{
           u=await new adminController(next,adminRepos,admin).getAdminByEmail(req.headers.email);
        }
        console.log(u)
        console.log("go to poll");
        
        res.send(u);
       }
       catch(e){
        console.log(e.message);
       }
    });
    
    AdminRouter.post("/admin",async function(req,res,next){
      console.log("loooooooooooooooo")
      console.log("loooooooooooooooo")
       let result=await new adminController(next,adminRepos,admin).createAdmin(req.body.email,req.body.password,req.body.name,req.body.phone);
       if(result){
        res.send({"tell":"iii"});
       }
     
    });
    AdminRouter.delete("/admin",async function(req,res,next){
     let result=await new adminController(next,adminRepos,admin).deleteAdmin(req.headers.email);
    
      console.log(result)
     if(result){
        res.send({"res":"done"})
     }
    });
    
    AdminRouter.put("/admin",async function(req,res,next){
      console.log(req.body.email)
     let result=await new adminController(next,adminRepos,admin).updateAdmin(req.headers.email,req.body,)
      console.log(req.body.email)
    if(result){      
     res.send({"res":"done"});
    }
   
    });
    return AdminRouter;
}
export default AdminRouterFun;