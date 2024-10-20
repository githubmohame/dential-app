import { MaxKey } from "mongodb";
import { Schema, model } from "mongoose";
import { validate } from "uuid";

const ServiceSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  cost: {
    type: Number,
  },
});
const Service = model("Services", ServiceSchema);
export default Service;
