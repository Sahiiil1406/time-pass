const express=require('express');
const router=express.Router();

const auth=require('../middleware/auth')
const {getMyNotifications,createNotificationAndSendPushToAll}=require('../controllers/notification')
const {createNotificationValidator}=require('../validators/notification.validator')
const validate=require('../validators/main')

router.get('/getMyNotifications',auth,getMyNotifications)
router.post('/createNotification',createNotificationValidator(),validate,auth,createNotificationAndSendPushToAll)

module.exports=router;