import ErrorCustome from "../utilities/error.js";
import WorkDays from "../models/work_days.model.js";
class WorkDaysRepo {
  constructor() {
    this.WorkDays = WorkDays;
  }

  async getWorkDays() {
    try {
      const workDays = await this.WorkDays.find();
      if (workDays.length === 0) {
        throw new ErrorCustome("No workdays found.", "WorkDaysRepo", 404);
      }
      return workDays;
    } catch (error) {
      console.error("Error fetching workdays:", error);
      throw new ErrorCustome("Error fetching workdays.", "WorkDaysRepo", 500);
    }
  }

  async updateWorkDay(key, value) {
    try {
      const update = {};
      update[key] = value; //startWorkDay endWorkDay

      const updatedWorkDay = await this.WorkDays.findOneAndUpdate(
        { [key]: { $ne: value } },
        update,
        { runValidators: true }
      );

      if (!updatedWorkDay) {
        throw new ErrorCustome(
          "Workday not found or no changes made.",
          "WorkDaysRepo",
          404
        );
      }

      return updatedWorkDay;
    } catch (error) {
      console.error("Error updating workdays:", error);
      throw new ErrorCustome("Error updating workdays.", "WorkDaysRepo", 500);
    }
  }
}

export default WorkDaysRepo;
