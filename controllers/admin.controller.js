class AdminController{
    constructor(next,adminRepos,admin){
       this.next = next;
       this.adminRepos = adminRepos;
       this.admin = admin;
    }
     async createAdmin(email,password,name ,phone){
 
      try{
       return await new this.adminRepos(this.admin,this.next).addAdmin(email,password,name ,phone);
      }
      catch(e){
      }
     }
     async getAdminById(id){
     return await new this.adminRepos(this.admin,this.next).getAdminById(id);
   }
     async getAdminByEmail(email){
      return await  new this.adminRepos(this.admin,this.next).getAdminByEmail(email);
  
     }
  async deleteAdmin(email){
    return await  new this.adminRepos(this.admin,this.next).deleteAdmin(email);
  }
  async updateAdmin(email,map1){
    return await new this.adminRepos(this.admin,this.next). updateAdmin(email,map1);
  }

 }
 export default AdminController;