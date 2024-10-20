import mongoose, { Schema, model } from "mongoose";

const reviewSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  title: {
    type: String,
  },
  review: {
    type: String,
  },
  rating: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

let Review = model("Review", reviewSchema);
export default Review;
