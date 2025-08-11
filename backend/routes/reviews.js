// routes/reviews.js
const express = require("express");
const {
  getProductReviews,
  createProductReview,
  updateReview,
  deleteReview,
} = require("../controllers/reviewController");
const { protect } = require("../middleware/auth");
const router = express.Router();
router.route("/:id").put(protect, updateReview).delete(protect, deleteReview);
router.route("/").post(protect, createProductReview);
router.route("/:productId").get(getProductReviews);
module.exports = router;
