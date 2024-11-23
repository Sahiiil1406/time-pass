const mongoose=require('mongoose');

const notificationSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    },
    notificationType:{
        type:String,
        enum:['follow','post','poll','invite','postandpoll','event','community']
    },
    message:{
        type:String
    },
    postId:{
        type:mongoose.Types.ObjectId,
        ref:"SocialPost",
        default:null
    },
    pollId:{
        type:mongoose.Types.ObjectId,
        ref:"Poll",
        default:null
    },
    inviteId:{
        type:mongoose.Types.ObjectId,
        ref:"Invite",
        default:null
    },
},{timestamps:true})

const Notification=mongoose.model("Notification",notificationSchema)
module.exports=Notification