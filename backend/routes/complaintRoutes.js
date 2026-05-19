const express = require('express');
const router = express.Router();
const {
    getComplaints,
    searchComplaints,
    createComplaint,
    updateComplaint,
    deleteComplaint
} = require('../controllers/complaintController');

const { protect } = require('../middleware/authMiddleware');

// Note: Ensure /search is placed before /:id so it doesn't get treated as an ID parameter
router.get('/search', searchComplaints);

router.route('/')
    .get(protect, getComplaints)
    .post(protect, createComplaint);

router.route('/:id')
    .put(protect, updateComplaint)
    .delete(protect, deleteComplaint);

module.exports = router;
