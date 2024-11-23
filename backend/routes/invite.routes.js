const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const {sendInviteforTeam,
    acceptInviteforTeam,
    rejectInviteforTeam,
    joinTeamwithoutInviteforTeam,
    getMyInviteforTeam} = require('../controllers/invite');
const {
    sendInviteforTeamValidator,
    acceptInviteforTeamValidator,
    rejectInviteforTeamValidator,
    joinTeamwithoutInviteforTeamValidator
} = require('../validators/invite.validator');

const validate = require('../validators/main');


router.get("/get",auth,getMyInviteforTeam)    
router.post('/send/:teamId',sendInviteforTeamValidator(),validate, auth, sendInviteforTeam);
router.put('/accept/:inviteId',acceptInviteforTeamValidator(),validate, auth, acceptInviteforTeam);
router.put('/reject/:inviteId',rejectInviteforTeamValidator(),validate, auth, rejectInviteforTeam);

//only for server side

router.put('/joinWithoutInvite/:teamId',joinTeamwithoutInviteforTeamValidator(),validate, auth, joinTeamwithoutInviteforTeam);

module.exports = router;