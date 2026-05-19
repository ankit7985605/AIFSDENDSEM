const Complaint = require('../models/Complaint');

// @desc    Get all complaints (or filter by user/location)
// @route   GET /api/complaints
// @access  Private
const getComplaints = async (req, res) => {
    try {
        const complaints = await Complaint.find().sort({ createdAt: -1 });
        res.status(200).json(complaints);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Search complaints by location
// @route   GET /api/complaints/search
// @access  Public or Private depending on requirement
const searchComplaints = async (req, res) => {
    try {
        const { location } = req.query;
        if (!location) {
            return res.status(400).json({ message: 'Please provide a location query' });
        }
        // Use regex for case-insensitive partial matching
        const complaints = await Complaint.find({ location: { $regex: location, $options: 'i' } });
        res.status(200).json(complaints);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create new complaint
// @route   POST /api/complaints
// @access  Private
const createComplaint = async (req, res) => {
    try {
        const { name, email, title, description, category, location, aiPriority, aiDepartment, aiSummary, aiResponse } = req.body;

        if (!title || !description || !category || !location) {
            return res.status(400).json({ message: 'Please add all required fields' });
        }

        const complaint = await Complaint.create({
            name: name || req.user.name,
            email: email || req.user.email,
            title,
            description,
            category,
            location,
            aiPriority,
            aiDepartment,
            aiSummary,
            aiResponse
        });

        res.status(201).json(complaint);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update complaint
// @route   PUT /api/complaints/:id
// @access  Private
const updateComplaint = async (req, res) => {
    try {
        const complaint = await Complaint.findById(req.params.id);

        if (!complaint) {
            return res.status(404).json({ message: 'Complaint not found' });
        }

        const updatedComplaint = await Complaint.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true } // Returns the updated document
        );

        res.status(200).json(updatedComplaint);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete complaint
// @route   DELETE /api/complaints/:id
// @access  Private
const deleteComplaint = async (req, res) => {
    try {
        const complaint = await Complaint.findById(req.params.id);

        if (!complaint) {
            return res.status(404).json({ message: 'Complaint not found' });
        }

        await complaint.deleteOne();

        res.status(200).json({ id: req.params.id, message: 'Complaint deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getComplaints,
    searchComplaints,
    createComplaint,
    updateComplaint,
    deleteComplaint
};
