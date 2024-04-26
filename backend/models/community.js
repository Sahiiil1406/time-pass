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
    admin:[{
        type:mongoose.Types.ObjectId,
        ref:"User"
    }],
    description:{
        type:String,
        require:true
    },
    avatar:{
        type: {
            url: String,
            localPath: String,
          },
            default: {
                url: `https://via.placeholder.com/800x450.png`,
                localPath: "",
            },
    },
    open:{
        type:Boolean,
        default:true
    }

},{timestamps:true})

const Community=mongoose.model("Community",communitySchema)
module.exports=Community