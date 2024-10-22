import { Schema, model } from "mongoose";

const workDaysSchema = new Schema(
  {
    startWorkDay: {
      type: String,
      default: "Mon",
      required: true,
      unique: true,
    },
    endWorkDay: { type: String, default: "Fri", unique: true, required: true },
  },
  { collection: "workdays" }
);

const WorkDays = model("WorkDays", workDaysSchema);
export default WorkDays;
