const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    email: {
        type: String,
        required: [true, 'Please add an email']
    },
    title: {
        type: String,
        required: [true, 'Please add a title for the complaint']
    },
    description: {
        type: String,
        required: [true, 'Please add a description']
    },
    category: {
        type: String,
        required: [true, 'Please select a category']
    },
    location: {
        type: String,
        required: [true, 'Please add a location']
    },
    status: {
        type: String,
        default: 'Pending',
        enum: ['Pending', 'In Progress', 'Resolved', 'Rejected']
    },
    // AI Generated Fields
    aiPriority: {
        type: String
    },
    aiDepartment: {
        type: String
    },
    aiSummary: {
        type: String
    },
    aiResponse: {
        type: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Complaint', complaintSchema);
