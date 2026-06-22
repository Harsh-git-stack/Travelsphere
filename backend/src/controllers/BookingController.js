const mongoose = require("mongoose");
const Booking = require("../models/Booking");
const Tour = require("../models/Tour");

const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate("tour").sort({ createdAt: -1 });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getBookingById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid booking ID" });
    }

    const booking = await Booking.findById(req.params.id).populate("tour");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateBookingStatus = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid booking ID" });
    }

    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    const allowedStatuses = ["pending", "confirmed", "cancelled"];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: "Status must be pending, confirmed, or cancelled",
      });
    }

    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    ).populate("tour");

    if (!updatedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json(updatedBooking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createBooking = async (req, res) => {
  try {
    const {
      tour,
      destinationTitle,
      destinationLocation,
      name,
      email,
      phone,
      persons,
      travelDate,
      specialRequests,
    } = req.body;

    if (tour && !mongoose.Types.ObjectId.isValid(tour)) {
      return res.status(400).json({ message: "Invalid tour ID" });
    }

    let existingTour = null;

    if (tour) {
      existingTour = await Tour.findById(tour);

      if (!existingTour) {
        return res.status(404).json({ message: "Tour not found" });
      }
    }

    const finalDestinationTitle = destinationTitle || existingTour?.title;
    const finalDestinationLocation = destinationLocation || existingTour?.location;

    if (
      !finalDestinationTitle ||
      !finalDestinationLocation ||
      !name ||
      !email ||
      !phone ||
      !persons ||
      !travelDate
    ) {
      return res.status(400).json({
        message:
          "Destination, name, email, phone, persons, and travelDate are required",
      });
    }

    const newBooking = await Booking.create({
      tour: tour || undefined,
      destinationTitle: finalDestinationTitle,
      destinationLocation: finalDestinationLocation,
      name,
      email,
      phone,
      persons,
      travelDate,
      specialRequests,
    });

    res.status(201).json(newBooking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getBookings,
  getBookingById,
  updateBookingStatus,
  createBooking,
};
