const express = require('express');
const {
    createReview,
    getReviewsByProfessional,
    updateReview,
    deleteReview,
} = require('../controllers/reviewController');
const onlyUsers = require('../middleware/onlyUsers')
const onlyAdmin = require('../middleware/onlyAdmin')
const onlyProfessional = require('../middleware/onlyProfessional')
const router = express.Router();

// Routes
router.post('/',onlyUsers, createReview); // Create a review
router.get('/:professionalId', getReviewsByProfessional); // Get reviews for a professional
router.put('/:reviewId',onlyUsers, updateReview); // Update a review
router.delete('/:reviewId',onlyUsers, deleteReview); // Delete a review

module.exports = router;
