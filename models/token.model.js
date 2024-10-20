import { model, Schema } from "mongoose";

const TokenSchema = Schema({
  paseto: {
    type: String,
    required: true,
    unique: true,
  },
  user: {
    type: Schema.Types.ObjectId,
  },
  expire:{
    type: Date,
  }
});

let Token = model("Token", TokenSchema);
export default Token;
