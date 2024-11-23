const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({ 
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        
    },
    startTime: {
        type: String,
    },
    startDate: {
        type: Date,
    },
    endDate:{
        type: Date, 
    },
    mode: {
        type: String,
        required: true,
        enum: ['online', 'offline','hybrid']
    },
    location: {
        type: String,
        default:null
    },
    category: {
        type: String,
        required: true,
    },
    images: [
       String
    ],
    organizer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
},{timestamps: true});

const Event= mongoose.model('Event', eventSchema);
module.exports = Event;