import { Router } from "express";

function WorkDaysFunc(WorkDaysController) {
  const router = Router();
  const workDaysController = new WorkDaysController();
  router.get("/workdays", async (req, res) => {
    workDaysController.getWorkDays(req, res);
  });
  router.put("/workdays", async (req, res) =>
    workDaysController.updateWorkDay(req, res)
  );
  return router;
}
export default WorkDaysFunc;
