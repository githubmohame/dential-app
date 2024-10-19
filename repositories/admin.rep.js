import ErrorCustome from "../utilities/error.js";
import getErrorSchema from "../utilities/get_errors_schema.js";
class AdminRepos{
    constructor(Admin,next){
        this.next=next;
        this.Admin=Admin;
    }
    async getAdminByEmail(email){
        let res=await this.Admin.find({ email: email});
        if(res){
            return {error:0,res:res};
            //return ;
        }
        let err1=new Error();
        err1.res=ErrorCustome("the admin not found","admin.repos",200);
        this.next(err1);
        return;
    }
    async  getAdminById(id){
        let res=await this.Admin.findById(id);
        if(res){
            return {error:0,res:res};
            //return ;
        }
        let err1=new Error();
        err1.res=ErrorCustome("the admin not found","admin.repos",200);
        this.next(err1);
        return ;
    }
    async deleteAdmin(email){
        let res=await this.Admin.deleteOne({email:email});
        if(res.deletedCount==0){
            let err1=new Error( );
            err1.res=new ErrorCustome("admin not found","admin",400)
            this.next(err1);
            return ;
        }
        return {error:1,"msgErr":"the admin deleted"}
    }
    async  addAdmin(email,password,name ,phone){
        
        
            let admin=await new this.Admin({email:email,password:password,name:name,phone:phone});
          
          let err=   admin.validateSync();
          console.log("tell me");``
          if(err!=null){
           let message=getErrorSchema(err);
           let err1=new Error( );
           err1.res=new ErrorCustome(message,"admin",400)
           this.next(err1);
           return;
          }
          try{
            await  admin.save();
             console.log("kkiuui");
          }
          catch(e){
             console.log(e);
             this.next(e);
             return;
           return;
          }
          try{
            await  admin.save();
             console.log("kkiuui");
          }
          catch(e){
             console.log(e);
             this.next(e);
             return;
          }
        return {error:0,"res":"the admin created"}
    }
    async  updateAdmin(email,map1){
        let t=await this.Admin.find({email:email});
        console.log(t);
        console.log(t);
        let err=await this.Admin.updateOne({email:email},map1,{ runValidators: true });
        //console.log(err);
        if(err.errors!=null){
        console.log(err)
        //console.log(err);
        if(err.errors!=null){
        console.log(err)
         let message=getErrorSchema(err);
         let err1=new Error( );
         err1.res=new ErrorCustome(message,"admin",200)
         await this.next(err1);
         return;
        }
        return {error:0,"res":"the admin update"}
    }
}

}
export default AdminRepos;