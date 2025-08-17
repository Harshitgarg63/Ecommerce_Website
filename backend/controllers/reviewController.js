const Review = require("../models/Review");

// GET reviews for a product
exports.getProductReviews = async (req, res) => {
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

// CREATE a new review
exports.createProductReview = async (req, res) => {
  try {
    const { title, text, rating } = req.body;

    // productId comes from route param
    const product = req.params.productId;

    // user comes from protect middleware
    const user = req.user._id;

    const review = await Review.create({ title, text, rating, product, user });
    res.status(201).json({ success: true, data: review });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// UPDATE a review
exports.updateReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review)
      return res
        .status(404)
        .json({ success: false, error: "Review not found" });

    if (review.user.toString() !== req.user._id.toString()) {
      return res
        .status(401)
        .json({
          success: false,
          error: "Not authorized to update this review",
        });
    }

    const updatedReview = await Review.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({ success: true, data: updatedReview });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// DELETE a review
exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review)
      return res
        .status(404)
        .json({ success: false, error: "Review not found" });

    if (review.user.toString() !== req.user._id.toString()) {
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
