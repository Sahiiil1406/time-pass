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
    const follower=await SocialFollow.find({followeeId:req.user._id})
    const followerCount=follower.length()

    const following=await SocialFollow.find({followerId:req.user._id})
    const followingCount=following.length()

    const followEachother=await SocialFollow.findOne({
      followeeId:user._id,
      followerId:req.user._id
    })
    
    let isfollowing=0;
    if(followEachother){
      isfollowing=1;
    }

    return res.status(200).json({
      msg: "User profile fetched successfully",
      followerCount:followerCount,
      followingCount:followingCount,
      isFollowing:isfollowing,
      userProfile,
    });
  } catch (error) {
    return res.status(400).json({
      msg: "Error in retrieving user",
      error,
    });
  }
};

module.exports = { getUserByusername };
