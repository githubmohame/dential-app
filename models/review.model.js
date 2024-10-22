import mongoose, { Schema, model } from "mongoose";

const reviewSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  title: {
    type: String,
    required: [true, "Need a title"],
  },
  review: {
    type: String,
  },
  rating: {
    type: String,
    required: [true, "Need a rating"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

let Review = model("Review", reviewSchema);
export default Review;
