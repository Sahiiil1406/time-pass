const mongoose = require('mongoose');

const eventmemberSchema = new mongoose.Schema({
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    },
    memberId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
},{timestamps: true});

const EventMember= mongoose.model('EventMember', eventmemberSchema);
module.exports = EventMember;