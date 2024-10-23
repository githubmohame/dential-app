import ErrorCustome from "../utilities/error.js";

export default class TokenController {
  constructor(userModel, adminModel,tokenRepos,tokenModel,next) {
    this.userModel = userModel;
    this.adminModel = adminModel;
    this.tokenRepos = tokenRepos;
    this.tokenModel=tokenModel
    this.next = next;
  }
  async createTokenByEmail(email) {
    console.log("9999999");
    let res1 = await this.userModel.findOne({email:email});
    if(!res1){
      res1=await this.adminModel.findOne({email:email});
    }  
    console.log("hyyyyy");
    if(!res1){
      let err1=new Error();
      err1.res=new ErrorCustome("the user not found","",500);
      this.next(err1);
      return;
    }
    console.log(this.tokenModel);
    let token=await new this.tokenRepos(this.userModel,this.tokenModel ,this.adminModel,this.next).addToken(res1._id);
    return token;
    }
  async createTokenByRefresh(token) {
    let user=await new this.tokenRepos(this.userModel,this.tokenModel ,this.adminModel,next).getPasetoUser(token);
    let tokennew=await new this.tokenRepos(this.userModel,this.tokenModel ,adminModel,this.next).addToken(user.tokenModel._id);
    return tokennew;
    //let res1 = userRepos().getUserByEmail();
    //let res2 = adminRepos().getAdminByEmail(req.headers["email"]);
  }
  async getPasetoUser(token){
    let user=await new this.tokenRepos(this.userModel,this.tokenModel,this.adminModel,this.next).getPasetoUser(token);
    return user;
  }
}
// constructor(userModel,TokenModel = null, token = null,adminModel,next)