import ErrorCustome from "../utilities/error.js";
import ReviewRepo from "../repositories/reviewRepo.js";

class ReviewController {
  constructor(Review, next) {
    this.reviewRepo = new ReviewRepo(Review);
    this.next = next;
  }

  async getAllReviews(req, res) {
    try {
      const reviews = await this.reviewRepo.getAllReviews();
      res.status(200).json(reviews);
    } catch (error) {
      console.error("Error in getAllReviews:", error);
      this.next(
        new ErrorCustome("Error fetching reviews.", "Review Controller", 500)
      );
    }
  }

  async postReview(req, res) {
    const { user, service, review, rating } = req.body;
    try {
      await this.reviewRepo.addReview(user, service, review, rating);
      res.status(201).json({ message: "Review added successfully." });
    } catch (error) {
      console.error("Error in postReview:", error);
      this.next(
        new ErrorCustome("Error adding review.", "Review Controller", 500)
      );
    }
  }
}

export default ReviewController;
