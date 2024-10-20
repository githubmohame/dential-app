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

  async addReview(user, title, review, rating) {
    const newReview = new this.Review({
      user,
      title,
      review,
      rating,
    });

    try {
      await newReview.save();
      console.log("Review added successfully.");
    } catch (error) {
      console.error("Error adding review:", error);
      throw error;
    }
  }
}

export default ReviewRepo;
