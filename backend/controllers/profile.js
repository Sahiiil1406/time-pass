const SocialFollow = require("../models/follow.js");
const User = require("../models/user.js");

const getUserByusername = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({
        msg: "User NOt found",
      });
    }
    
    const follower=await SocialFollow.find({followeeId:user._id})
    const followerCount=follower.length
    

    const following=await SocialFollow.find({followerId:user._id})
    const followingCount=following.length
   // console.log(follower)
    

   const followUser=await SocialFollow.findOne({
    followerId:req.user._id,
    followeeId:user._id
 }) 
  //console.log(following)
  let isFollowing=false
  if(followUser){
    isFollowing=true
  }
    

    return res.status(200).json({
      msg: "User profile fetched successfully",
      followerCount:followerCount,
      followingCount:followingCount,
      isFollowing:isFollowing,
      user,
    });
  } catch (error) {
    return res.status(400).json({
      msg: "Error in retrieving user",
      error,
    });
  }
};

module.exports = { getUserByusername };
