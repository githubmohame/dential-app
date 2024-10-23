import { Router } from "express";
import ServiceController from "../../controllers/serviceController.js";

export default function ServiceRouterFun(Service,CustomePasetoMiddleWare,CheckPermission,
  TokenController,userModel, adminModel,tokenRepos
) {
  const router = Router();
  const serviceController = new ServiceController(Service);
  router.use(async(req,res,next)=>{
    
    CustomePasetoMiddleWare(req, res, next, TokenController,userModel, adminModel,tokenRepos)
  })
  router.use(async(req,res,next)=>{
    
    CheckPermission(req, res, next);
  });
 
  //both
  router.get("/", async (req, res, next) => {
    try {
      await serviceController.getAllServices(req, res);
    } catch (error) {
      next(error); //implement your error custom
    }
  });
  //admin
  router.delete("/delete-service", async (req, res, next) => {
    try {
      await serviceController.deleteService(req, res);
    } catch (error) {
      next(error);
    }
  });
  //admin
  router.post("/", async (req, res, next) => {
    try {
      await serviceController.addService(req, res);
    } catch (error) {
      next(error);
    }
  });
  //admin
  router.put("/update-service", async (req, res, next) => {
    try {
      await serviceController.updateServiceCost(req, res);
    } catch (error) {
      next(error);
    }
  });

  return router;
}
