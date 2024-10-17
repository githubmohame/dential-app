import ErrorCustome from "../utilities/error.js";
import getErrorSchema from "../utilities/get_errors_schema.js";
//import User from "../models/user.model.js";
class UserRepos{
    constructor(User,next){
        this.next=next;
        this.User=User;
    }
    async getUserByEmail(email){
        let res=this.User.find({email: email});
        if(res){
            return {error:0,res:res};
            //return ;
        }
        return {error:1,msgErr:"the user not found"};
    }
   async getUserById(id){
        let res=this.User.findById(id);
        if(res){
            return {error:0,res:res};
            //return ;
        }
        return {error:1,msgErr:"the user not found"};
    }
   async deleteUser(email){
        let res=this.User.deleteOne({email:email});
        if(res.deletedCount==0){
            return {error:0,"res": "User not found"}
        }
        return {error:1,"msgErr":"the user deleted"}
    }
      async addUser(email,password,name ,phone){
      
            let user=new this.User({email:email,password:password,name:name,phone:phone});
          let err=   user.validateSync();
          if(err!=null){
           let message=getErrorSchema(err);
           let err1=new Error( );
           err1.res=new ErrorCustome(message,"admin",400)
           this.next(err1);
           return;
          }
          user.save();
        return {error:0,"res":"the user created"}
    }
   async updateUser(email,map1){
        await this.User.updateOne({email:email},{...map1});
        return {error:0,"res":"the user update"}
    }
}

export default UserRepos;