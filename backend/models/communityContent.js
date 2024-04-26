const community= require('./community');
const mongoose=require("mongoose")

const communityContentSchema=new mongoose.Schema({
    question:{
        type:String,
        require:true
    },
    answer:[{
        type:String,
        require:true
    }],
    community:{
        type:mongoose.Types.ObjectId,
        ref:"Community"
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
    author:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    }
},{timestamps:true})

const CommunityContent=mongoose.model("CommunityContent",communityContentSchema)
module.exports=CommunityContent