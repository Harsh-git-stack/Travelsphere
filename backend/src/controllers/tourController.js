const mongoose = require("mongoose");
const Tour = require("../models/Tour");

const getTours = async (req, res) => {
  try {
    const { title, location, minPrice, maxPrice, sortBy } = req.query;

    let filter = {};

    if (title) {
  filter.title = { $regex: title, $options: "i" };
}
    if (location) {
      filter.location = { $regex: location, $options: "i"};
    }

   if (minPrice || maxPrice) {
  filter.price = {};

  if (minPrice) {
    filter.price.$gte = Number(minPrice);
  }

  if (maxPrice) {
    filter.price.$lte = Number(maxPrice);
  }
}

    let sortOption = { createdAt: -1 };

if (sortBy === "price_asc") {
  sortOption = { price: 1 };
}

if (sortBy === "price_desc") {
  sortOption = { price: -1 };
}

const tours = await Tour.find(filter).sort(sortOption);

    res.status(200).json(tours);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const createTour = async (req, res) => {
  try {
    const { title, description, location, price } = req.body;

    if (!title || !description || !location || price === undefined) {
      return res.status(400).json({
        message: "Title, description, location, and price are required",
      });
    }

    if (typeof price !== "number") {
      return res.status(400).json({
        message: "Price must be a number",
      });
    }

    const newTour = await Tour.create({
      title,
      description,
      location,
      price,
    });

    res.status(201).json(newTour);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateTour = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid tour ID" });
    }

    const { title, description, location, price } = req.body;

    if (!title || !description || !location || price === undefined) {
      return res.status(400).json({
        message: "Title, description, location, and price are required",
      });
    }

    if (typeof price !== "number") {
      return res.status(400).json({
        message: "Price must be a number",
      });
    }

    const updatedTour = await Tour.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        location,
        price,
      },
      { new: true, runValidators: true }
    );

    if (!updatedTour) {
      return res.status(404).json({ message: "Tour not found" });
    }

    res.status(200).json(updatedTour);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteTour = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid tour ID" });
    }

    const deletedTour = await Tour.findByIdAndDelete(req.params.id);

    if (!deletedTour) {
      return res.status(404).json({ message: "Tour not found" });
    }

    res.status(200).json({ message: "Tour deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTourById = async (req, res) => {
   try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid tour ID" });
    }

    const tour = await Tour.findById(req.params.id);

    if (!tour) {
      return res.status(404).json({ message: "Tour not found" });
    }

    res.status(200).json(tour);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = { getTours, createTour, updateTour, deleteTour, getTourById };

