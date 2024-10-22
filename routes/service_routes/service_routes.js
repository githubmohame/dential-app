import { Router } from "express";
import ServiceController from "../../controllers/serviceController.js";

function ServiceRouterFun(Service,CustomePasetoMiddleWare, TokenController,userModel, adminModel,tokenRepos,CheckPermission) {
  console.log(CheckPermission)
  const router = Router({ strict: true });
  router.use(async(req,res,next)=>{
    
    CustomePasetoMiddleWare(req, res, next, TokenController,userModel, adminModel,tokenRepos)
  })
  router.use(async(req,res,next)=>{
    
    CheckPermission(req, res, next);
  });
  const serviceController = new ServiceController(Service);
  router.get("/services", async (req, res, next) => {
    try {
      await serviceController.getAllServices(req, res);
    } catch (error) {
      next(error); //implement your error custom
    }
  });

  router.delete("/services/delete-service", async (req, res, next) => {
    try {
      await serviceController.deleteService(req, res);
    } catch (error) {
      next(error);
    }
  });

  router.post("/services", async (req, res, next) => {
    try {
      await serviceController.addService(req, res);
    } catch (error) {
      next(error);
    }
  });

  router.put("/services/update-service", async (req, res, next) => {
    try {
      await serviceController.updateServiceCost(req, res);
    } catch (error) {
      next(error);
    }
  });

  return router;
}
export default ServiceRouterFun;