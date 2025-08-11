// routes/orders.js
const express = require("express");
const {
  createOrder,
  getUserOrders,
} = require("../controllers/orderController");
const { protect } = require("../middleware/auth");
const router = express.Router();
router.post("/", protect, createOrder);
router.get("/myorders", protect, getUserOrders);
module.exports = router;
