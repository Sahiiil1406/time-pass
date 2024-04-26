const mongoose=require("mongoose")

const commentSchema=new mongoose.Schema({
    postId:{
        type:mongoose.Types.ObjectId,
        ref:"Post",
    },
    content:{
        type:String,
        require:true
    },
    communityContentId:{
        type:mongoose.Types.ObjectId,
        ref:"CommunityContent",
    },
    author:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        require:true
    }
},{timestamps:true})

const SocialComment=mongoose.model("SocialComment",commentSchema)
module.exports=SocialComment