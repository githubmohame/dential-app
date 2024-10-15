import { Router } from "express";
import { encryptPaseto } from "../../utilities/pasoto_utilities";
import { use } from "bcrypt/promises";
export function TokenRoute(verifyMiddleware,pasetoRepos,userRepos,adminRepos) {
    const route=Router();
    route.use(verifyMiddleware);
    route.get("createToken",async function(req,res){
        let res1=userRepos().getUserByEmail(req.headers["email"]);
        let res2=adminRepos().getAdminByEmail(req.headers["email"]);
        if(res1.error||res2.error){
            let user=res1["res"];
            if(user==null){
                user=res2
            }
           let ret1= await encryptPaseto();
           ret1.key;
           ret1.paseto;
           pasetoRepos.id=user;
           pasetoRepos.token=ret1.paseto
           return pasetoRepos.createPaseto(key);
        
        }
    });
}
/*
   this.id=id;
        this.userPaseto=userPaseto;
        this.token=token;
*/