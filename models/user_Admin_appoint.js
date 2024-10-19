import { Schema, model } from "mongoose";
import ErrorCustome from "../utilities/error";
const UserAdminsAppointsSchema = Schema({
  adminService: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "AdminsServices",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
  date: {
    type: Date,
    validate: {
      validator: function (v) {
        let diffDate = v - Date.now();
        if (diffDate.getUTCDate() > 1) {
          return true;
        } else {
          return false;
        }
      },
      message: function (prop) {
        return "the date should be bigger than this day";
      },
    },
  },
});
submissionSchema.index({ date: 1, adminService: 1 }, { unique: true });
UserAdminsAppointsSchema.post("save", function (error, doc, next) {
  if (error.name === "MongoError" && error.code === 11000) {
    let err = new Error();
    err.res = ErrorCustome(
      "this appointment is full",
      "AdminUserAppointmentSchema",
      500
    );
    next(new Error());
  } else {
    next(error);
  }
});
const AdminsUsersAppoints = model(
  "AdminsUsersAppoints",
  UserAdminsAppointsSchema
);
export default AdminsUsersAppoints;
