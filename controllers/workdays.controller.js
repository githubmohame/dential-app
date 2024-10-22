import WorkDaysRepo from "../repositories/work_days.rep.js";
class WorkDaysController {
  constructor() {
    this.workDaysRepo = new WorkDaysRepo();
  }

  async getWorkDays(req, res) {
    try {
      const workDays = await this.workDaysRepo.getWorkDays();
      res.status(200).json(workDays);
    } catch (error) {
      console.error("Error in getWorkDays:", error);
      res.status(500).json({ message: "Error fetching workdays." });
    }
  }

  async updateWorkDay(req, res) {
    const { key, value } = req.body; //key:ie startWorkDay, endWorkDay || value: the new day
    try {
      const updatedWorkDay = await this.workDaysRepo.updateWorkDay(key, value);
      res
        .status(200)
        .json({ message: "Workday updated successfully.", updatedWorkDay });
    } catch (error) {
      console.error("Error in updateWorkDay:", error);
      res.status(500).json({ message: "Error updating workdays." });
    }
  }
}

export default WorkDaysController;
