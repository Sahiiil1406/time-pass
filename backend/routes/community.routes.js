const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const {createCommunity,
    updateCommunity, 
   deleteCommunity,
getCommunity} = require('../controllers/community');

router.post('/create', auth, createCommunity);
router.put('/update/:communityId', auth, updateCommunity);
router.delete('/delete/:communityId', auth, deleteCommunity);
router.get('/:communityId', auth);

module.exports = router;