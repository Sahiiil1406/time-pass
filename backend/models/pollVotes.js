const mongoose = require('mongoose');

const pollVotesSchema = new mongoose.Schema({
    pollId: {
        type: mongoose.Types.ObjectId,
        ref: "Poll",
        require: true
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        require: true
    },
    option: {
        type: String,
        require: true
    }
},{timestamps:true});

const PollVotes = mongoose.model("PollVotes", pollVotesSchema);
module.exports = PollVotes;