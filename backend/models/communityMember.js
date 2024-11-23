const mongoose=require("mongoose")

const communityMemberSchema=new mongoose.Schema({
   memberId:{
      type:mongoose.Types.ObjectId,
      ref:"user"
   },
   communityId:{
    type:mongoose.Types.ObjectId,
    ref:"Community"
   },
   role:{
    type:String,
    default:"member",
      enum:["member","admin"]
   }
},
{timestamps:true})

const CommunityMember=mongoose.model("CommunityMember",communityMemberSchema)
module.exports=CommunityMember