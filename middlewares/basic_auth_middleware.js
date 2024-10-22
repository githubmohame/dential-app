import ErrorCustome from "../utilities/error.js";
import { compare } from "bcrypt";
export async function BasicAuthMiddleware(
  req,
  res,
  next,
  adminRepos,userRepos,
  userModel,adminModel
) {
  if (req.headers["email"] && req.headers["password"]) {
    
    let user1 = await userModel.findOne({email:req.headers["email"]});
    req.usertype = "user";
    if (!user1) {
      user1 = await adminModel.findOne({email:req.headers["email"]});
      req.usertype = "admin";

    }
    console.log();
    console.log(user1);
    if (!(user1)) {
      let err1 = new Error();
      err1.res =new  ErrorCustome(
        "the email or password is incorrect",
        "function BasicAuthMiddleware 1",
        500
      );
      next(err1);
      return;
    }
    function compareAsync(param1, param2) {
      return new Promise(function(resolve, reject) {
         compare(param1, param2, function(err, res) {
          console.log(res);
              if (err) {
                   reject(err);
              } else {
                   resolve(res);
              }
          });
      });
  }
  let check =false;  
  try{
     check=await compareAsync("991",user1.password );
    }
    catch(e){
    }
    console.log(check);
    if(!check){
      err1={}
      err1.res = new ErrorCustome(
        "the email or password is incorrect",
        "function BasicAuthMiddleware 1",
        500
      );
      next(err1);
      return;
    }
    console.log(check);
    next();
    return;
  }
  let err1 = new Error();
  err1.res = ErrorCustome(
    "the header should have email and password",
    "function BasicAuthMiddleware 2",
    500
  );
  next(err1);
}
