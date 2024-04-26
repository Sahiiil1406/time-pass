const mongoose=require("mongoose")
const {Schema}=mongoose

const likeSchema=new mongoose.Schema({
    postId:{
        type:mongoose.Types.ObjectId,
        ref:"SocialPost",
        default:null
    },
    communityContentId:{
        type:mongoose.Types.ObjectId,
        ref:"CommunityContent",
        default:null
    },
    commentId: {
        type: Schema.Types.ObjectId,
        ref: "SocialComment",
        default: null,
    },
    likedBy:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        require:true
    }
},{timestamps:true})

const SocialLike=mongoose.model("SocialLike",likeSchema)
module.exports=SocialLike