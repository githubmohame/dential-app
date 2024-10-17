import { checkEntity } from "../utilities/checkEntity";
import ErrorCustome from "../utilities/error";
import getErrorSchema from "../utilities/get_errors_schema";

class AdminsServicesRepos{
    constructor(adminsServices,next){
        this.next;
        this.adminsServices = adminsServices;
    }
   async getAdminsServices(adminId){
        let services=await this.adminsServices.find({admin:adminId});
        return {services:services};
    }
   async addAdminService(adminId,serviceId,cost,star,adminModel){
        if(!(await checkEntity(adminModel,"_id",adminId))){
          let err1=new Error( );
         err1.res=new ErrorCustome("he is not an admin","admin",400)
         this.next(err1);
         return;
        }
        let count=(await (await this.addAdminService.find({admin:adminId,service:serviceId})).count());
        //this.adminsServices.insert({admin:adminId,service:serviceId,cost:cost,star:star})
        if(count){
            let err=new Error();
            err.res=new ErrorCustome("this service is exist","",500);
            next(err);
            return;
        }
        let adminService=new this.adminsServices.insert({admin:adminId,service:serviceId,cost:cost});
        let err=   adminService.validateSync();
        if(err!=null){
         let message=getErrorSchema(err);
         let err1=new Error( );
         err1.res=new ErrorCustome(message,"admin",400)
         this.next(err1);
         return;
       }
       return {error:0,"res":"add service to admin"}
    }
    async deleteAdminService(adminId,serviceId){
      let u=await this.addAdminService.deleteOne({admin:adminId,service:serviceId});
      if(!u){
        let err1=new Error( );
        err1.res=new ErrorCustome("there is no service for that user","admin",400)
        this.next(err1);
        return;
      }
    }
   async updateAdminService(adminId,map1,serviceId){
        this.addAdminService.updateOne({admin:adminId,service:serviceId},{...map1});
        return {error:0,"res":"the user update"}
    }
}