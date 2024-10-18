import ErrorCustome from "../utilities/error.js";

class AdminRepos{
    constructor(Admin,next){
        this.next=next;
        this.Admin=Admin;
    }
    async getAdminByEmail(email){
        let res=this.Admin.find({ email: email});
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
        let count=await this.Admin.find({email:email,phone:phone});
        if(count.length){
            console.log("drop delete");
            let err1=new Error( );
            err1.res=new ErrorCustome("this email or phone used","admin",200)
            await this.next(err1);
            return;
        }
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
        return {error:0,"res":"the admin created"}
    }
    async  updateAdmin(email,map1){
        let err=await this.Admin.updateOne({email:email},map1,{ runValidators: true });
        if(err!=null){
         let message=getErrorSchema(err);
         let err1=new Error( );
         err1.res=new ErrorCustome(message,"admin",200)
         await this.next(err1);
         return;
        }
        return {error:0,"res":"the admin update"}
    }
}

export default AdminRepos;