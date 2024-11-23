const express = require('express');
const router = express.Router();
const auth=require('../middleware/auth')

const { createPoll,
    getPollsbyId,
    deletePoll,
    updatePoll,
    voteUnvoteFeedPoll } = require('../controllers/polls');

router.post('/create',auth, createPoll);
router.get('/get/:pollId',auth, getPollsbyId);
router.delete('/delete/:pollId',auth, deletePoll);
router.put('/update/:pollId',auth, updatePoll);
router.post('/vote/:pollId',auth, voteUnvoteFeedPoll);

module.exports = router;