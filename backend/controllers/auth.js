const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.js");
const redis = require("../config/redis.js");
const sendEmail = require("../utils/nodemailer.js");
const Otp = require("../models/otp.js");

//signupUser
const signupUser = async (req, res) => {
  try {
    const { email,
        username, 
        password,
        bio,
        dob, 
        phoneNumber, 
        location} =req.body;
      
    if (!email || !username || !password) {
      return res.json({ msg: "Please fill in all fields" });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.json({ msg: "User already exists" });
    }
    const otpModel=await Otp.findOne({email})

    if(!otpModel.verify){
      return res.json({ msg: "OTP is not verified" });
    }
    /* const avatarLocalPath = req.files?.avatar[0]?.path;
        if (!avatarLocalPath) {
            throw new ApiError(400, "Avatar file is required")
        }
        const avatar = await uploadOnCloudinary(avatarLocalPath) */
    const newUser = await User.create({
      email,
      username,
      password,
      location,
      bio,
      dob,
      phoneNumber,
    });
    return res.status(200).json({
      msg: "User created succesfully",
      newUser,
    });
  } catch (error) {
    return res.status(400).json({
      msg: "Error in creating user",
      error,
    });
  }
};

//loginUser
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ msg: "Please fill in all fields" });
    }
    const user = await User.findOne({ email });

    if (!user) {
      return res.json({ msg: "User does not exist" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ msg: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES,
    });

    const options = {
      httpOnly: true,
      secure: true,
    };
    return res.status(200).cookie("token", token, options).json({
      msg: "User logged in successfully",
      user,
      token,
    });
  } catch (error) {
    return res.status(400).json({
      msg: "Error in logging in",
      error,
    });
  }
};

//logoutUser
const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({
      msg: "User logged out successfully",
    });
  } catch (error) {
    return res.status(400).json({
      msg: "Error in logging out",
      error,
    });
  }
};

//updateUser
const updateUser = async (req, res) => {
  try {
    const { username } = req.params;
    const { name, email, password, bio, dob, phoneNumber, location,otp} = req.body;
    const user = await User.findOneAndUpdate(
      { username },
      {
        username: name,
        email,
        password,
        bio,
        dob,
        phoneNumber,
        location,
      },
      { new: true }
    );
    return res.status(200).json({
      msg: "User updated successfully",
      user,
    });
  } catch (error) {
    return res.status(400).json({
      msg: "Error in updating user",
      error,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOneAndDelete({ username });
  } catch (error) {
    return res.status(400).json({
      msg: "Error in deleting user",
      error,
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    // Query from Redis
    /*  const redisData = await redis.get("user");
        if (redisData) {
            return res.status(200).json({
                message: "List of all users (from Redis)",
                data: JSON.parse(redisData)
            });
        } */

    // Query from MongoDB
    const users = await User.find({});

    // Store in Redis with a TTL of 1 hour (3600 seconds)
    //await redis.set("user", JSON.stringify(users), "EX", 3600);

    return res.status(200).json({
      message: "List of all users (from MongoDB)",
      data: users,
    });
  } catch (error) {
    return res.status(400).json({
      msg: "Error in retrieving users-getAll",
      error,
    });
  }
};


const generateOTP = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await Otp.findOne({
      email,
    });
   
    const otp = Math.floor(100000 + Math.random() * 900000); 
    if(user){
      user.otp=otp;
      await user.save();
    }else{
      await Otp.create({
        email,
        otp,
      });
    }
    
    //send otp to email
    const subject = "OTP for password reset";
    const text = `Your OTP for password reset is ${otp}`;
    await sendEmail(email, subject, text);


    return res.status(200).json({
      msg: "OTP generated successfully",
      otp,
    });
  }
  catch (error) {
    return res.status(400).json({
      msg: "Error in generating OTP",
      error,
    });
  }
}
const verifyOTP = async (req, res) => { 
  try {
    const { email, otp } = req.body;
    const user = await Otp.findOne({
      email,
    });
    if (!user) {
      return res.json({
        msg: "User does not exist",
      });
    }
    if (user.otp !== otp) {
      return res.json({
        msg: "Invalid OTP",
      });
    }
    user.verify = true;
    return res.status(200).json({
      msg: "OTP verified successfully",
    });
  }
  catch (error) {
    return res.status(400).json({
      msg: "Error in verifying OTP",
      error,
    });
  }
}

const resetPassword = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      email,
    });
    if (!user) {
      return res.json({
        msg: "User does not exist",
      });
    }
    user.password = password;
    await user.save();
    return res.status(200).json({
      msg: "Password reset successfully",
    });
  }
  catch (error) {
    return res.status(400).json({
      msg: "Error in resetting password",
      error,
    });
  }
}
    


module.exports = {
  signupUser,
  loginUser,
  logoutUser,
  updateUser,
  deleteUser,
  getAllUsers,
  generateOTP,
  verifyOTP,
  resetPassword
};
