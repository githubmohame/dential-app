import { Schema, model, models } from "mongoose";
import { ErrorCustome } from "../utilities/error.js";
const TimeSchema = Schema({
  hour: {
    type: Number,
    required: true,
    validate: {
      validator: function (v) {
        if (v >= 0 && v < 24) {
          return true;
        }
        return false;
      },
      message: (props) => `the hour should be between 0 and 23`,
    },
  },
  mintue: {
    type: TimeSchema,
    required: true,
    validate: {
      validator: function (v) {
        if (v >= 0 && v < 60) {
          return true;
        }
        return false;
      },
      message: (props) => `the mintue should be between 0 and 59 `,
    },
  },
});

const WorkDaysSchema = Schema({
  start: {
    type: TimeSchema,
    required: true,
  },
  end: {
    type: TimeSchema,
    required: true,
  },
  day: {
    type: String,
    enum: {
      values: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      message: "enter only the  abbreviation of week days",
    },
  },
  admin: {
    type: Schema.Types.ObjectId,
    ref: "admin",
  },
});
WorkDaysSchema.index(
  { day: 1, admin: true, "start.hour": true, "end.hour": true },
  { unique: true }
);
WorkDaysSchema.post("save", function (error, doc, next) {
  let err = new Error("");

  if (error.name === "MongoError" && error.code === 11000) {
    err.res = ErrorCustome("this time aready used", "Work day schema 1", 500);
  } else {
    err.res = ErrorCustome(err.message, "Work day schema 2", 500);
    next(err);
  }
});
const WerkDays = model("WerkDays", WorkDaysSchema);
