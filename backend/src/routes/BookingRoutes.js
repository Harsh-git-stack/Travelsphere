const express = require("express");
const { protect, adminOnly } = require("../middleware/authmiddleware");
const {
  getBookings,
  getBookingById,
  updateBookingStatus,
  createBooking,
} = require("../controllers/BookingController");
const router = express.Router();

router.get("/", protect, adminOnly, getBookings);
router.get("/:id", protect, adminOnly, getBookingById);
router.post("/", createBooking);
router.patch("/:id/status", protect, adminOnly, updateBookingStatus);

module.exports = router;

