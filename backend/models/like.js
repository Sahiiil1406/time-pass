const mongoose=require("mongoose")
const {Schema}=mongoose

const likeSchema=new mongoose.Schema({
    postId:{
        type:mongoose.Types.ObjectId,
        ref:"SocialPost",
        default:null
    },
    commentId: {
        type: Schema.Types.ObjectId,
        ref: "SocialComment",
        default: null,
    },
    pollId:{
        type:mongoose.Types.ObjectId,
        ref:"Poll",
        default:null
    }
    ,
    likedBy:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        require:true
    }
},{timestamps:true})

const SocialLike=mongoose.model("SocialLike",likeSchema)
module.exports=SocialLike