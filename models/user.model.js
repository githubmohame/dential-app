import { Schema, model } from "mongoose";
import { genSalt, hash } from "bcrypt";
import ErrorCustome from "../utilities/error.js";

const UserSchema = Schema({
  name: {
    tell: [],
    unique: false,
    type: [String, "you should send string"],
    required: [true, "you should send name"],
    minLength: [3, "Must be at least 3, got {VALUE}"],
    maxLength: [50, "the name is too long"],
    validate: {
      validator: function (v) {
        //throw new Error('Need to get a Turbo Man for Christmas');
        return /^[a-zA-Z]+$/.test(v);
      },
      message: function (prop) {
        return "it is not a valid name";
      },
    },
  },
  phone: {
    type: String,
    unique: true,
    validate: {
      validator: function (v) {
        return /\d{3}-\d{3}-\d{4}/.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
    required: [true, "User phone number required"],
  },
  email: {
    unique: [true, "this email is already used"],
    type: [String, "the email not valid"],
    required: [true, "You should send email"],
    validate: {
      validator: function (v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: function (prop) {
        return "it is not a valid email";
      },
    },
  },
  password: {
    type: String,
    required: true,
  },
});
UserSchema.pre("save", async function (next) {
  let u = await User.find({ email: this.email });
  if (u.length) {
    let err1 = new Error();
    err1.res = new ErrorCustome(
      "this email is already used",
      "admin message",
      500
    );
    next(err1);
  }
  u = await User.find({ phone: this.phone });
  if (u.length) {
    let err1 = new Error();
    err1.res = new ErrorCustome(
      "this phone is already used",
      "admin message",
      500
    );
    next(err1);
  }
  try {
    const salt = await genSalt(10);
    let hashedPassword = await hash(this.password, salt);
    this.password = hashedPassword;
  } catch (error) {
    return next(
      Error(new ErrorClass("user message error", "admin message error", 300))
    );
  }
  try {
    const salt = await genSalt(10);
    let hashedPassword = await hash(this.password, salt);
    this.password = hashedPassword;
  } catch (error) {
    console.log(error.res);
    return next(
      Error(new ErrorClass("user message error", "admin message error", 300))
    );
  }
  new Error({});
});

let User = model("User", UserSchema);
User.findQuery=async function(query){};
export default User;
