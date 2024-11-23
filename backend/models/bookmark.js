const mongoose=require("mongoose")
const {Schema}=mongoose


const bookmarkSchema=new mongoose.Schema({
  
  postId: {
    type: Schema.Types.ObjectId,
    ref: "SocialPost",
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref:"User"
  }
},
{ timestamps: true })

const Bookmark=mongoose.model("Bookmark",bookmarkSchema)
module.exports=Bookmark