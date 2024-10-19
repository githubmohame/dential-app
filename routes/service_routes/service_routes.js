import { Router } from "express";
import ServiceController from "../controllers/serviceController.js";

export default function ServiceRouterFun(Service) {
  const router = Router();
  const serviceController = new ServiceController(Service, next);

  router.get("/services", async (req, res, next) => {
    try {
      await serviceController.getAllServices(req, res);
    } catch (error) {
      next(error); //implement your error custom
    }
  });

  router.delete("/services/:name", async (req, res, next) => {
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

  router.put("/services/:name/cost", async (req, res, next) => {
    try {
      await serviceController.updateServiceCost(req, res);
    } catch (error) {
      next(error);
    }
  });

  return router;
}
