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
    name:{
        type:String,
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
    image: {
      type: String,
      default: "",
    },
   education:[
    {
      type:String,
      default:""
    }],
   hobbies:[
    {
      type:String,
      default:""
    }
   ],
    bio: {
      type: String,
      default: "",
    },
    dob: {
      type: Date,
      default: null,
    },
    profession:{
        type:String
    },
    location: {
      type: {
        type: String, // GeoJSON type (Point, Polygon, etc.)
        enum: ['Point'], // Only allow Point type for now
        default: 'Point'
      },
      coordinates: {
        type: [Number], // Array of longitude and latitude
        default: [0, 0]
      }
    }
    ,
    address:{
      type:String,
      default:""
    },
    phoneNumber: {
      type: String,
      default: "",
    },
    collaorattionCount:{
      type:Number,
      default:0
    },
    gender:{
      type:String,
    },
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
