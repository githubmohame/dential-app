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
        return {error:1,msgErr:"the user not found"};
    }
    async  getAdminById(id){
        let res=this.Admin.findById(id);
        if(res){
            return {error:0,res:res};
            //return ;
        }
        return {error:1,msgErr:"the user not found"};
    }
    async deleteAdmin(id){
        let res=this.Admin.deleteOne({_id:id});
        if(res.deletedCount==0){
            return {error:0,"res": "User not found"}
        }
        return {error:1,"msgErr":"the user deleted"}
    }
    async  addAdmin(email,password,name ,phone){
      
            let user=new this.Admin({email:email,password:password,name:name,phone:phone});
          let err=   user.validateSync();
          if(err!=null){
           let message=getErrorSchema(err);
           let err1=new Error( );
           err1.res=new ErrorCustome(message,"admin",400)
           this.next(err1);
           return;
          }
        return {error:0,"res":"the user created"}
    }
    async  updateAdmin(id,map1){
        this.Admin.updateOne({_id:id},{...map1});
        return {error:0,"res":"the user update"}
    }
}

export default AdminRepos;