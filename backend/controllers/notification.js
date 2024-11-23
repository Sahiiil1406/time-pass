
const Notification=require('../models/notification')
const User=require('../models/user')
const {emitSocketEvent}=require('../sockets/socket')

const getMyNotifications=async(req,res)=>{
    try {
        const page=parseInt(req.query.page) || 1
        const limit=parseInt(req.query.limit) || 10
        const notifications=await Notification.find({userId:req.user._id}).sort({createdAt:-1}).skip((page-1)*limit).limit(limit)
       
        return res.status(200).json({
            notifications,
            msg:"Notifications fetched successfully"
        })
        
    } catch (error) {
        return res.status(500).json({
            error:error.message,
        msg:"Error in getting notifications"
    })
    }
}

const createNotificationAndSendPushToAll=async(req,res)=>{
    try {
        const {notificationType,message,postId,pollId,inviteId}=req.body
        const users=await User.find({}).select("_id")
 
        const notification=new Notification({
            userId:req.user._id,
            notificationType,
            message,
            postId,
            pollId,
            inviteId
        })
        
     for(let i=0;i<users.length;i++){
     emitSocketEvent(
        req,
        users[i]._id.toString(),
        "NOTIFICATION_EVENT",
        notification)
    }   

    return res.status(200).json({
        msg:"Notification created and sent to all users"
    })
        
    } catch (error) {
        return res.status(500).json({
            error:error.message,
        msg:"Error in creating notification"
    })
    }
}

module.exports={
    getMyNotifications,
    createNotificationAndSendPushToAll
}