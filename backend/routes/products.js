// routes/products.js
const express = require("express");
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const { protect, authorize } = require("../middleware/auth");
const router = express.Router();
router.route("/").get(getProducts);
router.route("/:id").get(getProductById);
router.route("/").post(protect, authorize("admin"), createProduct);
router
  .route("/:id")
  .put(protect, authorize("admin"), updateProduct)
  .delete(protect, authorize("admin"), deleteProduct);
module.exports = router;
