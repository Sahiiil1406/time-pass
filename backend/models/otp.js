const mongoose=require('mongoose')

const otpSchema=new mongoose.Schema({
    email:{
        type:String,
        require:true
    },
    otp:{
        type:Number,
        require:true
    },
    verify:{
        type:Boolean,
        default:false
    }
},{timestamps:true})

const Otp=mongoose.model("Otp",otpSchema)
module.exports=Otp