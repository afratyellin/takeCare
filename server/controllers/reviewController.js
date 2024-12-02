const Review = require("../models/Review");
const Professional = require("../models/Professional");

const mongoose = require("mongoose");
// Create a new review
const createReview = async (req, res) => {
  try {
    const { professionalId, rating, comment } = req.body;
    console.log(mongoose.Types.ObjectId.isValid(professionalId));
    // Convert professionalId to ObjectID if not already
    if (!mongoose.Types.ObjectId.isValid(professionalId)) {
      return res.status(400).json({ message: "Invalid professional ID" });
    }
    const professional = await Professional.findById(professionalId);
    if (!professional) {
      return res.status(404).json({ message: "Professional not found" });
    }
    console.log(professional);
    const newReview = await Review.create({
      professionalId,
      customerId: req.session.user.id, // Get customer ID from the session
      rating,
      comment,
    });

    res.status(201).json(newReview);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all reviews for a professional
const getReviewsByProfessional = async (req, res) => {
  try {
    const { professionalId } = req.params;

    const reviews = await Review.find({ professionalId }).populate(
      "customerId",
      "username"
    );
    res.status(200).json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching reviews" });
  }
};

// Update a review
const updateReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { rating, comment } = req.body;

    const review = await Review.findOneAndUpdate(
      { _id: reviewId, customerId: req.session.user.id },
      { rating, comment },
      { new: true }
    );

    if (!review) {
      return res
        .status(404)
        .json({ message: "Review not found or not authorized to update" });
    }

    res.status(200).json(review);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating review" });
  }
};

// Delete a review
const deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;

    const review = await Review.findOneAndDelete({
      _id: reviewId,
      customerId: req.session.user.id,
    });

    if (!review) {
      return res
        .status(404)
        .json({ message: "Review not found or not authorized to delete" });
    }

    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting review" });
  }
};

module.exports = {
  createReview,
  getReviewsByProfessional,
  updateReview,
  deleteReview,
};
