import { MaxKey } from "mongodb";
import Schema, { model } from "mongoose";
import { validate } from "uuid";

const ServiceSchema = Schema({
  name: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^[a-zA-Z]+$/.test(v);
      },
      message: function (prop) {
        return "it is not a valid name";
      },
    },
  },
  cost: {
    type: Number,
  },
});

export default Service = model("Services", ServiceSchema);
