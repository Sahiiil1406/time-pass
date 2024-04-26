const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const {sendInviteforTeam,
    acceptInviteforTeam,
    rejectInviteforTeam,
    joinTeamwithoutInviteforTeam,
    getInviteforTeam} = require('../controllers/invite');


router.get("/:username",auth,getInviteforTeam)    
router.post('/send/:teamId', auth, sendInviteforTeam);
router.put('/accept/:inviteId', auth, acceptInviteforTeam);
router.put('/reject/:inviteId', auth, rejectInviteforTeam);
router.put('/joinWithoutInvite/:teamId', auth, joinTeamwithoutInviteforTeam);

module.exports = router;