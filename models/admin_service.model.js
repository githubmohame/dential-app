import { model, Schema } from "mongoose";

const AdminsServicesSchema = Schema({
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admins",
  },
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Services",
  },
  cost: {
    type: Number,
    min: [5, "the cost should be at least 5"],
  },
});
export default AdminsServices = model("AdminsServices", AdminsServicesSchema);
