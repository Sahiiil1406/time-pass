const mongoose = require('mongoose');

const inviteSchema = new mongoose.Schema({
    teamId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team',
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending',
    },
    },{timestamps: true});

const Invite = mongoose.model('Invite', inviteSchema);
module.exports = Invite;