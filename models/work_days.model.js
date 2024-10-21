import { Schema, model } from "mongoose";

const workDaysSchema = new Schema(
  {
    startWorkDay: { type: String, default: "Mon", unique: true },
    endWorkDay: { type: String, default: "Fri", unique: true },
  },
  { collection: "workdays" }
);

const WorkDays = model("WorkDays", workDaysSchema);
export default WorkDays;
