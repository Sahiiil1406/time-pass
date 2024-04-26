const User = require("../models/user.js");
const SocialFollow = require("../models/follow.js");

const followUnfollowUser = async (req, res) => {
  try {
    const { username} = req.params;
    const toBeFollowed = await User.findOne({username});
  
    
    
    if (!toBeFollowed) {
      return res.status(404).json({
        msg: "User not found",
      });
    } 
    

    if (toBeFollowed.toString() === req.user._id.toString()) {
      return res.status(400).json({
        msg: "You cannot follow yourself",
      });
    }
    
    const isAlreadyFollowing = await SocialFollow.findOne({
      $and:[{followerId: req.user._id},
         {followeeId: toBeFollowed._id},]
    });
   

    if (isAlreadyFollowing) {
      await SocialFollow.findOneAndDelete({
        followerId: req.user._id,
        followeeId: toBeFollowed._id,
      });
      return res.status(200).json({
        msg: "Unfollowed successfully",
      });
    } else {
      await SocialFollow.create({
        followerId: req.user._id,
        followeeId: toBeFollowed._id,
      });
      return res.status(200).json({ msg: "Followed successfully" });
    }
  } catch (error) {
    return res.status(500).json({
      msg: error.message,
    });
  }
};

const getFollowersListByUserName = async (req, res) => {};
const getFollowingListByUserName = async (req, res) => {};

module.exports = {
  followUnfollowUser,
  getFollowersListByUserName,
  getFollowingListByUserName,
};
