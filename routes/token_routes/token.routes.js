import { Router } from "express";

function TokenRouteFunc(userModel, adminModel,TokenRepos,TokenController,tokenModel,middleware,adminRepos,UserRepos){
    const route=Router({ strict: true });
    route.use(async(req,res,next)=>{
       try{
        await middleware(req,res,next,UserRepos,adminRepos,userModel,adminModel);
       }
       catch(e){

       }
    });
    route.post("/",async function(req,res,next){
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