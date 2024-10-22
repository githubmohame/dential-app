import { model, Schema } from "mongoose";

const TokenSchema = Schema({
  token: {
    type: String,
    required: true,
    unique: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref:"admins"
  },
  expire:{
    type: Date,
  },
  refresh:{
    type:Schema.Types.ObjectId,
    refs:"Token",
  }
});

let Token = model("Token", TokenSchema);
export default Token;
