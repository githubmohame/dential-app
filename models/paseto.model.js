import { model, Schema } from "mongoose";

const PasetoSchema = Schema({
  privateKey: {
    type: String,
    required: true,
    unique: true,
  },
  paseto: {
    type: String,
    required: true,
    unique: true,
  },
  user: {
    type: Schema.Types.ObjectId,
  },
});

let UserPaseto = model("Pasto", PasetoSchema);
export default UserPaseto;
