const express = require("express");
const { getTours, createTour, updateTour, deleteTour, getTourById } = require("../controllers/tourController");
const { protect, adminOnly } = require("../middleware/authmiddleware");

const router = express.Router();

router.get("/", getTours);
router.post("/", protect, adminOnly, createTour);
router.put("/:id", protect, adminOnly, updateTour);
router.delete("/:id", protect, adminOnly, deleteTour);
router.get("/:id", getTourById);


module.exports = router;
