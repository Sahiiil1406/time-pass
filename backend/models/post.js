const mongoose=require("mongoose")
const {Schema}=mongoose


const postSchema=new mongoose.Schema({
  content: {
    type: String,
    required: true,
    index: true,
  },
  tags: {
    type: [String],
    default: [],
  },
  images: {
    type: [
      {
        url: String,
        localPath: String,
      },
    ],
    default: [],
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
},
{ timestamps: true })

const SocialPost=mongoose.model("SocialPost",postSchema)
module.exports=SocialPost