import { V4 } from "paseto";
class PasetoRepos{
    constructor(userPaseto=null,token=null,id=null){
        this.id=id;
        this.userPaseto=userPaseto;
        this.token=token;
    }
    async createPaseto(privateKey){
       let count= this.countDocuments();
       if(count){
        return null;
       }
       await this.userPaseto.create({user:this.id,privateKey:privateKey,paseto:this.token});
       return {"msg":"create token"};
    }
    async getPasetoUser(){
       return await this.userPaseto.find({ paseto:  `${this.token}` });
    }
}