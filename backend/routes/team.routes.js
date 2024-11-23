const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {createTeam,
    deleteTeam,
    updateTeam,
    getTeam,
    teamTaskComplted,
    addMemberbyIdThroughPost,
    getMyTeam}=require('../controllers/team.js');

const { createTeamValidator,
deleteTeamValidator,
updateTeamValidator,
getTeamValidator,
teamTaskCompltedValidator,
addMemberbyIdThroughPostValidator
}=require('../validators/team.validator');

const validate=require('../validators/main');


router.post('/create',createTeamValidator(),validate,auth,createTeam);
router.delete('/delete/:id',deleteTeamValidator(),validate, auth,deleteTeam);
router.put('/update/:id',updateTeamValidator(),validate,auth,updateTeam);
router.get('/get/:id',getTeamValidator(),validate,auth,getTeam);
router.put('/taskcompleted/:id',teamTaskCompltedValidator(),validate,auth,teamTaskComplted);
router.put('/addmember/:postId',addMemberbyIdThroughPostValidator(),validate
,auth,addMemberbyIdThroughPost);
router.get('/myteam',auth,getMyTeam);



module.exports = router;