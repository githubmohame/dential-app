import { decreptPaseto } from "../utilities/pasoto_utilities";
import ErrorCustome from "../utilities/error";
export async function CustomePasetoMiddleWare(req,res,next,pasetoRepos){
  let doc1=await pasetoRepos.getPasetoUser();
  try{
    msg=decreptPaseto(req.headers["token"],doc1.privateKey);
    req.user_type=msg.type;
    req.user_id=doc1.user;
    next();
  }
  catch(e){
    let err=new Error();
    err.res=new ErrorCustome("refresh the token",e,500);
    next(err);
  }
}