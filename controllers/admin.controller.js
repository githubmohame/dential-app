class AdminController{
    constructor(next,adminRepos,admin){
       this.next = next;
       this.adminRepos = adminRepos;
       this.admin = admin;
    }
     createAdmin(email,password,name ,phone){
 
      try{
        new this.adminRepos(this.admin,this.next).addUser(email,password,name ,phone);
      }
      catch(e){
      }
     }
 }
 export default AdminController;