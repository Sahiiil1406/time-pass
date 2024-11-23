const mongoose=require("mongoose")

const communitySchema=new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    category:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    image:{
        type:String,
        default:""
    },
    owner:{
        type:mongoose.Types.ObjectId,
        ref:"user"
    },

},{timestamps:true})

const Community=mongoose.model("Community",communitySchema)
module.exports=Community