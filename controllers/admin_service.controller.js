class AdminsServicesController{
    constructor(next,userRepos,adminService,adminModel){
       this.next = next;
       this.adminServiceRepos = userRepos;
       this.adminService = adminService;
       this.adminModel = adminModel;
    }
    async getAdminsServices(adminId){
       new this.adminServiceRepos(this.adminService,this.next).getAdminsServices(id);
    }
   async addAdminService(adminId,serviceId,cost,star){
 
      try{
        new this.adminServiceRepos(this.adminService,this.next).addAdminService(adminId,serviceId,cost,star,this.adminModel);
        res.send({msg:"add admin service sucessefully"});
      }
      catch(e){
      }
     }
     async deleteAdminsService(adminId,serviceId){
        new this.adminServiceRepos(this.adminService,this.next). deleteAdminService(id);
     }
    async updateAdminService(adminId,map1,serviceId){
       new this.adminServiceRepos(this.adminService,this.next). updateAdminService(adminId,map1,serviceId);
     }
 
 }
 export default AdminsServicesController;
