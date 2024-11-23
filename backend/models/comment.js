const mongoose=require("mongoose")
const SocialLike = require("./like")

const commentSchema=new mongoose.Schema({
    postId:{
        type:mongoose.Types.ObjectId,
        ref:"Post",
        default:null
        
    },
    content:{
        type:String,
        require:true
    },
    pollId:{
        type:mongoose.Types.ObjectId,
        ref:"Poll",
        default:null
    },
    author:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        require:true
    },
    parentComment:{
        type:mongoose.Types.ObjectId,
        ref:"SocialComment",
        default:null
    },
    replies:[{
        type:mongoose.Types.ObjectId,
        ref:"SocialComment"
    }]
},{timestamps:true})

commentSchema.pre("find",async function( next){
    this.populate({path:"replies",
     populate:{path:"author",select:"username image"}
}).select("-__v -postId -pollId -communityContentId ")
//likes count
/* this.createdAt=await SocialLike.find({
    commentId:this._id}).length  */

    next()
})

const SocialComment=mongoose.model("SocialComment",commentSchema)
module.exports=SocialComment