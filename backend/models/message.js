const mongoose=require('mongoose');

const messageSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    chat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chat',
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    attachment: {
        type: String,
    },
},{timestamps:true});

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;