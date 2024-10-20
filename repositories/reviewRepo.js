class ReviewRepo {
  constructor(Review) {
    this.Review = Review;
  }

  async getAllReviews() {
    try {
      const reviews = await this.Review.find();
      return reviews;
    } catch (error) {
      console.error("Error fetching reviews:", error);
      throw error;
    }
  }

  // Add a new review
  async addReview(user, title, reviewText, rating) {
    const review = new this.Review({
      user,
      title,
      review: reviewText,
      rating,
    });

    try {
      await review.save();
      console.log("Review added successfully.");
    } catch (error) {
      console.error("Error adding review:", error);
      throw error;
    }
  }
}

export default ReviewRepo;
