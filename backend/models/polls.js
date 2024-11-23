const mongoose=require("mongoose")

const pollSchema=new mongoose.Schema({
    name:{
        type:String,
        default:"Poll"
    },
    question:{
        type:String,
        require:true
    },
    options:[{
        text:String,
        votes:{
            type:Number,
            default:0
        }
    }],
    category:{
        type:String,
        require:true
    },
    communityId:{
        type:mongoose.Types.ObjectId,
        ref:"Community",
        default:null
    },
    author:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        require:true
    }
},{timestamps:true})

const Poll=mongoose.model("Poll",pollSchema)
module.exports=Poll