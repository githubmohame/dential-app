import { Router } from "express";

function TokenRouteFunc(userModel, adminModel,TokenRepos,TokenController,tokenModel,BasicAuthMiddleware,adminRepos,userRepos){
    const route=Router();
    route.use((req,res,next)=>{
        console.log("killer")
        BasicAuthMiddleware(
            req,
            res,
            next,
            adminRepos,userRepos,
            userModel,adminModel
          );
    });
    route.post("/",async function(req,res,next){
        console.log("")
        let result=null;
        console.log("heloow hhhyyy")
        if(req.headers["email"]){
           result= await new TokenController(userModel, adminModel,TokenRepos,tokenModel,next) .createTokenByEmail(req.headers["email"]) 
        }
        else{
            result=await new TokenController(userModel, adminModel,TokenRepos,tokenModel,next) . createTokenByRefresh(req.headers["token"]) 
        }
        if(result){
            res.send(result)
        }
    });
    return route;
}
export default TokenRouteFunc;
//constructor()