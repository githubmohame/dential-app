import { randomUUID ,createPrivateKey} from "crypto";
import * as jose from 'jose';
import ErrorCustome from "../utilities/error.js";
class TokenRepos {
  constructor(userModel,TokenModel = null,adminModel,next) {
    this.TokenModel = TokenModel;
    this.userModel = userModel;
    this.adminModel=adminModel;
    this.next = next;
  }
  async createToken() {
    let token=randomUUID();
    
    return token;
  }
  async getPasetoUser(token) {
    let u=await this.userModel.aggregate([{$lookup: {
      from: "tokens",
      localField: "_id",
      foreignField: "user",
      as: "token"
    }},{   $unwind: '$token' },{$match:{"token.token":token}},{$limit:1}]);
    if(u.length>0){
      u=u[0];
    }
    else{
      u=null;
    }
    if(!u){
       u=await this.adminModel.aggregate([{$lookup: {
        from: "tokens",
        localField: "_id",
        foreignField: "user",
        as: "token"
      }},{   $unwind: '$token' },{$match:{"token.token":token}}]);
      console.log(u);
      if(u.length>0){
        u=u[0];
         u.type="admin"
      }
      else{
        u=null;
      }
      //findOne().populate("users");
     
    }
    else if(u){
      u.type="user";
    }
    if(!u){
      console.log(u);
      let err1=new Error();
      err1.res=new ErrorCustome("token not valid","",500);
      this.next(err1);
      return;
    }

    if(new Date(u.expire)-new Date(Date.now())<=0){
      await this.TokenModel.deleteMany({token:token});
      let err1=new Error();
      err1.res=ErrorCustome("token expire","",500);
      this.next(err1);
      return;
    }
    return {"type":u.type,"name":u.name,"tokenModel":u};
  }
  async addToken(userId){
   await this.TokenModel.deleteMany({user:userId});
    //let key=randomBytes(256).toString('base64');
    let token=await this.createToken();
    let refresh=await this.createToken();
    let date=new Date(Date.now())
    date.setHours(date.getHours()+3);
   let tokenModel=new this.TokenModel();
    tokenModel.token=token;
    tokenModel.expire=date;
    let refreshModel=new this.TokenModel();
    refreshModel.token=refresh;
    let dateRefresh=new Date(Date.now());
    dateRefresh.setHours(dateRefresh.getHours()+24*5);
    dateRefresh.refresh=tokenModel._id;
    tokenModel.user=userId;
    refreshModel.user=userId
    await tokenModel.save();
    await refreshModel.save();
    return {"token":token, "refresh":refresh};
  }
}
export default TokenRepos;