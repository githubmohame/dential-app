import { Router } from "express";
import ReviewController from "../../controllers/reviewController.js";

function ReviewRouterFun(ReviewModel) {
  const router = Router();
  const reviewController = new ReviewController(ReviewModel);

  router.get("/review", async (req, res, next) => {
    try {
      await reviewController.getAllReviews(req, res);
    } catch (error) {
      next(error); //implement your error custom
    }
  });
  router.post("/review", async (req, res, next) => {
    try {
      await reviewController.postReview(req, res);
    } catch (error) {
      next(error); //implement your error custom
    }
  });
  return router;
}
export default ReviewRouterFun;
