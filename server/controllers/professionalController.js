const Review = require("../models/Review");
const Professional = require("../models/Professional");
const User = require("../models/User")
const mongoose = require("mongoose");


// Get all professionals with user and review details
const getProfessionals = async (req, res) => {
  try {
    // Fetch all professionals and populate user details
    const professionals = await Professional.find()
      .populate({
        path: "userId", 
        select: "fullname location email", // Select specific fields from User
      });

    // Fetch reviews for each professional and attach them manually
    const professionalsWithReviews = await Promise.all(
      professionals.map(async (professional) => {
        const reviews = await Review.find({ professionalId: professional._id })
          .populate({
            path: "customerId", // Populate customer details for each review
            select: "fullname email",
          })
          .select("rating comment customerId");

        return {
          ...professional.toObject(),
          reviews, // Attach the fetched reviews to the professional object
        };
      })
    );

    // Respond with the enhanced data
    res.status(200).json(professionalsWithReviews);
  } catch (error) {
    console.error("Error fetching professionals:", error.message);
    res.status(500).json({ message: "Error fetching professionals" });
  }
};

// Get Professional by id
const getProfessionalById = async (req, res) => {
  try {
    const { professionalId } = req.params;

    // Fetch the professional by ID and populate user details
    const professional = await Professional.findById(professionalId)
      .populate({
        path: "userId", // Assuming Professional has a reference field userId pointing to User
        select: "fullname location email", // Select specific fields from User
      });

    // If professional not found
    if (!professional) {
      return res.status(404).json({ message: "Professional not found" });
    }

    // Fetch reviews associated with this professional
    const reviews = await Review.find({ professionalId })
      .populate({
        path: "customerId", // Populate customer details for each review
        select: "fullname email",
      })
      .select("rating comment customerId");

    // Attach reviews to the professional object
    const professionalWithReviews = {
      ...professional.toObject(),
      reviews, // Add reviews to the response
    };

    // Respond with the professional data
    res.status(200).json(professionalWithReviews);
  } catch (error) {
    console.error("Error fetching professional:", error.message);
    res.status(500).json({ message: "Error fetching professional" });
  }
};



module.exports = {
  getProfessionals,
  getProfessionalById
};
