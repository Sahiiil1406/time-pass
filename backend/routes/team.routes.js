const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {createTeam,
    deleteTeam,
    updateTeam,
    getTeam}=require('../controllers/team.js');

router.post('/create',auth,createTeam);
router.delete('/delete/:id',auth,deleteTeam);
router.put('/update/:id',auth,updateTeam);
router.get('/get/:id',auth,getTeam);


module.exports = router;