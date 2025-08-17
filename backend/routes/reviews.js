const express = require("express");
const {
  getProductReviews,
  createProductReview,
  updateReview,
  deleteReview,
} = require("../controllers/reviewController");
const { protect } = require("../middleware/auth");

const router = express.Router({ mergeParams: true }); // important!

// GET all reviews for a product & POST new review
router.route("/").get(getProductReviews).post(protect, createProductReview);

// Update / delete a single review by review ID
router.route("/:id").put(protect, updateReview).delete(protect, deleteReview);

module.exports = router;
