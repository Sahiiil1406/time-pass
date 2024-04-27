const User = require("../models/user.js");
const SocialFollow = require("../models/follow.js");
const { pipeline } = require("nodemailer/lib/xoauth2/index.js");

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

const getFollowersListByUserName = async (req, res) => {
  try {
    const { username } = req.params;
    const followersAggregation=[
      {
        '$match': {
          'username': username
        }
      },
       {
        '$lookup': {
          'from': 'socialfollows', 
          'localField': '_id', 
          'foreignField': 'followeeId', 
          'as': 'follower', 
          'pipeline': [
            {
              '$lookup': {
                'from': 'users', 
                'localField': 'followerId', 
                'foreignField': '_id', 
                'as': 'followerProfile',
                pipeline: [
                  {
                    $project:{
                      password:0,
                      bio:0,
                      dob:0,
                      createdAt:0,
                      updatedAt:0,
                      __v:0
                    
                    }
                  }
                ]
              }
            },{
              '$project': {
                'followerProfile.password': 0,
                'followerProfile.bio': 0,
                'followerProfile.dob': 0,
                'followerProfile.createdAt': 0,
                'followerProfile.updatedAt': 0,
                'followerProfile.__v': 0
            }}
          ]
        }
      }, {
        '$project': {
          'follower': 1,
        }
      },
      
    ]    
    const user=await User.aggregate(followersAggregation);
    return res.status(200).json({
      followerList: user
    });
    
  } catch (error) {
    return res.status(500).json({
      msg: error.message,
    });
  }
};
const getFollowingListByUserName = async (req, res) => {
  try {
    const { username } = req.params;
    const followersAggregation=[
      {
        '$match': {
          'username': username
        }
      },
       {
        '$lookup': {
          'from': 'socialfollows', 
          'localField': '_id', 
          'foreignField': 'followerId', 
          'as': 'followee', 
          'pipeline': [
            {
              '$lookup': {
                'from': 'users', 
                'localField': 'followeeId', 
                'foreignField': '_id', 
                'as': 'followeeProfile',
                pipeline: [
                  {
                    $project:{
                      password:0,
                      bio:0,
                      dob:0,
                      createdAt:0,
                      updatedAt:0,
                      __v:0
                    
                    }
                  }
                ]
              }
            },{
              '$project': {
                'followeeProfile.password': 0,
                'followeeProfile.bio': 0,
                'followeeProfile.dob': 0,
                'followeeProfile.createdAt': 0,
                'followeeProfile.updatedAt': 0,
                'followeeProfile.__v': 0
            }}
          ]
        }
      }, {
        '$project': {
          'followee': 1,
        }
      },
      
    ]    
    const user=await User.aggregate(followersAggregation);
    return res.status(200).json({
      followerList: user
    });
    
  } catch (error) {
    return res.status(500).json({
      msg: error.message,
    });
  }
};

module.exports = {
  followUnfollowUser,
  getFollowersListByUserName,
  getFollowingListByUserName,
};
