const mongoose = require('mongoose');

const collaborationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
    },
    message:{
        type:String,
        default:""
    }
},{
    timestamps: true,
});

const Collaboration = mongoose.model('Collaboration', collaborationSchema);
module.exports = Collaboration;