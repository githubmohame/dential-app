import ErrorCustome from "../utilities/error.js"
class PasetoRepos {
  constructor(userModel,TokenModel = null, token = null,adminModel,next) {
    this.TokenModel = TokenModel;
    this.token = token;
    this.userModel = userModel;
    this.adminModel=adminModel;
    this.next = next;
  }
  async createPaseto(secretKey,userId) {
    const token = jwt.sign({ user:userId}, secretKey, { expiresIn: '1h' });
    return token;
  }
  async getPasetoUser(token) {
    let u=this.userModel.find().populate({path:"user",model:"Token",match:{token:token}});
    if(!u.length){
      let u=this.AdminModel.findOne().populate({path:"user",model:"Token",match:{token:token},select:"expire"});
    }
    if(!u.length){
      let err1=new Error();
      err1.res=ErrorCustome("token not valid","",500);
      this.next(err1);
      return;
    }
    for(let i=0; i<u.length; i++){

    }

  }
  async addToken(userId){
    
  }
}
