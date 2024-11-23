const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({    
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    open: {
        type: Boolean,
        default: false,
    },
    isActive:{
        type:Boolean,
        default:true
    },
    maxSize: {
        type: Number
    },
},{timestamps: true});

const Team = mongoose.model('Team', teamSchema);
module.exports = Team;