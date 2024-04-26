const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcryptjs");

const userSchema = new Schema(
  {
    username:{
        type:String,
        require:true,
        unique:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    }, 
    password:{
        type:String,
        require:true
    }, 
    coverImage: {
      type: {
        url: String,
        localPath: String,
      },
      default: {
        url: `https://via.placeholder.com/800x450.png`,
        localPath: "",
      },
    },
   
    bio: {
      type: String,
      default: "",
    },
    dob: {
      type: String,
      default: null,
    },
    location:{
      type:String,
      GeolocationCoordinates:[]
    }
    ,
    phoneNumber: {
      type: String,
      default: "",
    }
  },
  { timestamps: true }
);
//hash password using pre
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});



//for geospatial filter
userSchema.index({ location: '2dsphere' });

const User = mongoose.model("User", userSchema);
module.exports = User;
