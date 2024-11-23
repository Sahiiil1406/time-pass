const express=require('express');
const router=express.Router();
const auth=require('../middleware/auth')

const {markAndUnmarkCollaboration,
    getCollaboratorListByPostId}=require('../controllers/collaboration')
const validate=require('../validators/main')
const {mongoIdPathVariableValidator}=require('../validators/common.js')

router.post('/markAndUnmark/:postId',mongoIdPathVariableValidator('postId'),validate
,auth,markAndUnmarkCollaboration)   

router.get('/getUserList/:postId',mongoIdPathVariableValidator('postId'),validate,auth,getCollaboratorListByPostId)


module.exports=router;
