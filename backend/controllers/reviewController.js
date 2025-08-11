// controllers/reviewController.js
const Review = require("../models/Review");

// @desc    Get reviews for a single product
// @route   GET /api/v1/products/:productId/reviews
// @access  Public
exports.getProductReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({
      product: req.params.productId,
    }).populate("user", "name");
    res
      .status(200)
      .json({ success: true, count: reviews.length, data: reviews });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Create a new review for a product
// @route   POST /api/v1/products/:productId/reviews
// @access  Private
exports.createProductReview = async (req, res, next) => {
  try {
    const { title, text, rating } = req.body;
    const product = req.params.productId;
    const user = req.user.id;
    const review = await Review.create({
      title,
      text,
      rating,
      product,
      user,
    });
    res.status(201).json({ success: true, data: review });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Update a review
// @route   PUT /api/v1/reviews/:id
// @access  Private
exports.updateReview = async (req, res, next) => {
  try {
    let review = await Review.findById(req.params.id);
    if (!review) {
      return res
        .status(404)
        .json({ success: false, error: "Review not found" });
    }
    if (review.user.toString() !== req.user.id) {
      return res
        .status(401)
        .json({
          success: false,
          error: "Not authorized to update this review",
        });
    }
    review = await Review.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({ success: true, data: review });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Delete a review
// @route   DELETE /api/v1/reviews/:id
// @access  Private
exports.deleteReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res
        .status(404)
        .json({ success: false, error: "Review not found" });
    }
    if (review.user.toString() !== req.user.id) {
      return res
        .status(401)
        .json({
          success: false,
          error: "Not authorized to delete this review",
        });
    }
    await review.deleteOne();
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
