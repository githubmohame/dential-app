import { Router } from "express";
function WorkDaysFunc(workDays, workDaysRepos, WorkDaysController) {
  const route = Router();
  route.get("/workdays", async (req, res, next) => {
    WorkDaysController(workDaysRepos, next, workDays).getWorkDays(
      req.header["id"]
    );
  });
  route.post("/workdays", async (req, res, next) => {
    let adminId = req.body.adminId || req.headers.adminId;
    WorkDaysController(workDaysRepos, next, workDays).addWorkDays(
      adminId,
      req.body.startHour,
      req.body.startMinute,
      req.body.endHour,
      req.body.endMinute,
      req.body.day
    );
  });

  route.delete("/workdays", async (req, res, next) => {
    WorkDaysController(workDaysRepos, next, workDays).deleteWorkDays(
      req.headers.workDaysId
    );
  });
  route.put("/workdays", async (req, res, next) => {
    WorkDaysController(workDaysRepos, next, workDays).updateWorkDays(
      req.headersworkDaysId,
      map
    );
  });
}
export default WorkDaysFunc;
