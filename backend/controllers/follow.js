const User = require("../models/user.js");
const SocialFollow = require("../models/follow.js");
const Notification = require("../models/notification.js");
const {getDistance}=require('geolib')
const { emitSocketEvent } = require("../sockets/socket");

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
         {followeeId: toBeFollowed._id}]
    });
   

    if (isAlreadyFollowing) {
      await SocialFollow.findOneAndDelete({
        followerId: req.user._id,
        followeeId: toBeFollowed._id,
      });
      await Notification.findOneAndDelete({
        userId: toBeFollowed._id,
        message: `${req.user.username} started following you`,
        notificationType: "follow",
      });
      return res.status(200).json({
        msg: "Unfollowed successfully",
      });
    } else {
      await SocialFollow.create({
        followerId: req.user._id,
        followeeId: toBeFollowed._id,
      });
      const notify=await Notification.create({
        userId:toBeFollowed._id,
        notificationType:"follow",
        message:`${req.user.username} started following you`,
      })
      emitSocketEvent(req,toBeFollowed._id.toString(),"NOTIFICATION_EVENT",notify)
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
    const page=parseInt(req.params.page) || 1
    const { username } = req.params;
    const followersAggregation=[{
      $match: {
        username:username
      }},{
      $project: {
        username:1,
        bio:1,
        image:1
      }
      },{
      $lookup: {
        from: 'socialfollows',
        localField: '_id',
        foreignField: 'followeeId',
        as: 'followers',
        pipeline:[{
        $project:{
           followerId:1
        }
        },{
         $lookup:{
        from: 'users',
        localField: 'followerId',
        foreignField: '_id',
        as: 'user',
         }
        }]
      }
      },
       {
      $project: {
        followers:1,
        _id:0
      }
       },{
      $unwind: {
        path: '$followers'
      }},
       {
         $addFields: {
           username: '$followers.user.username',
           bio:'$followers.user.bio',
           location:'$followers.user.location',
           image:'$followers.user.image',
           _id:'$followers.user._id'
         }
       },{
      $addFields: {
        username:{
          $arrayElemAt:['$username',0]
        },
        location:{
          $arrayElemAt:['$location',0]
        },
        bio:{
          $arrayElemAt:['$bio',0]
        },
        image:{
          $arrayElemAt:['$image',0]
        },
        _id:{
          $arrayElemAt:['$_id',0]
        }
      }},{
      $project: {
        followers:0
      }},{
        '$skip':10*(page-1)
      },{
        '$limit':10
      }]

    const users=await User.aggregate(followersAggregation);
   
    
    for (let user of users) {
      if (req.user.location.coordinates[0] === 0 && req.user.location.coordinates[1] === 0) {
        user.location = null;
        break;
      } else {
        if (!user.location || user.location.coordinates[0] == 0 && user.location.coordinates[1] == 0) {
          user.location = null;
        } else {
          const lat1 = req.user.location.coordinates[0];
          const lon1 = req.user.location.coordinates[1];
          const lat2 = user.location.coordinates[0];
          const lon2 = user.location.coordinates[1];
          let distance = getDistance(
            { latitude: lat1, longitude: lon1 }, 
            { latitude: lat2, longitude: lon2 }
          ) / 1000;
          if (Math.floor(distance) == 0) {
            distance = 1;
          }
          
          user.location = Math.floor(distance);
          
        }
      }
    }
    return res.status(200).json({
      msg:"followers list",
      followerList: users
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
    const page=parseInt(req.query.page) || 1
    const followersAggregation=[{
      $match: {
        username:username
      }},{
      $project: {
        username:1,
        bio:1,
        image:1
      }
},{
 $lookup: {
        from: 'socialfollows',
        localField: '_id',
        foreignField: 'followerId',
        as: 'followers',
        pipeline:[{
          $project:{
             followeeId:1,
            _id:0
          }},{
        $lookup:{
           from: 'users',
        localField: 'followeeId',
        foreignField: '_id',
        as: 'user',
}
        }
        ]
      }},{
      $project: {
        followers:1,
        _id:0
      }
       },{
      $unwind: {
        path: '$followers'
      }},{
$addFields: {
  username:'$followers.user.username',
  bio:'$followers.user.bio',
  location:'$followers.user.location',
  image:'$followers.user.image',
  _id:'$followers.user._id'
  
}
},{
$addFields: {
  username:{
    $arrayElemAt:['$username',0]
  },
  bio:{
    $arrayElemAt:['$bio',0]
  },
  image:{
    $arrayElemAt:['$image',0]
  },
  location:{
    $arrayElemAt:['$location',0]
  },
  _id:{
    $arrayElemAt:['$_id',0]
  }
}},{
$project: {
  followers:0
}},{
  $skip:(page-1)*10
},{
  $limit:10
}]
      const users=await User.aggregate(followersAggregation);
      //console.log(users)
      for (let user of users) {
        if (req.user.location.coordinates[0] === 0 && req.user.location.coordinates[1] === 0) {
          user.location = null;
          break;
        } else {
          if (!user.location || user.location.coordinates[0] == 0 && user.location.coordinates[1] == 0) {
            user.location = null;
          } else {
            const lat1 = req.user.location.coordinates[0];
            const lon1 = req.user.location.coordinates[1];
            const lat2 = user.location.coordinates[0];
            const lon2 = user.location.coordinates[1];
            let distance = getDistance(
              { latitude: lat1, longitude: lon1 }, 
              { latitude: lat2, longitude: lon2 }
            ) / 1000;
            if (Math.floor(distance) == 0) {
              distance = 1;
            }
            
            user.location = Math.floor(distance);
            
          }
        }
      }

   
    return res.status(200).json({
      followerList: users
    });
    
  } catch (error) {
    return res.status(500).json({
      msg: error.message,
    });
  }
};

const blockOrUnblockUser = async (req, res) => {
  try {
    const { username } = req.params;
    const toBeBlocked = await User.findOne({ username });
    if (!toBeBlocked) {
      return res.status(404).json({
        msg: "User not found",
      });
    }
    if (toBeBlocked._id.toString() === req.user._id.toString()) {
      return res.status(400).json({
        msg: "You cannot block yourself",
      });
    }
    const followAlready = await SocialFollow.findOne({
      $and: [{ followerId: req.user._id }, { followeeId: toBeBlocked._id }],
    });


    const isAlreadyBlocked = await SocialFollow.findOne({
      $and: [{ followerId: req.user._id }, { followeeId: toBeBlocked._id }, { isBlocked: true }],
    });
    if (isAlreadyBlocked) {
      await
      SocialFollow.findOneAndDelete(
        {
          followerId: req.user._id,
          followeeId: toBeBlocked._id,
        },
      );
      return res.status(200).json({
        msg: "Unblocked successfully",
      });
    }else{
      if(followAlready){
        await SocialFollow.findOneAndUpdate(
          {
            followerId: req.user._id,
            followeeId: toBeBlocked._id,
          },
          { isBlocked: true }
        );
      }
      else{
        await SocialFollow.create({
          followerId: req.user._id,
          followeeId: toBeBlocked._id,
          isBlocked: true,
        });
      }
      return res.status(200).json({
        msg: "Blocked successfully",
      });
    }
  }
  catch (error) {
    return res.status(500).json({
      msg: error.message,
    });
  }
}

const getBlockedUsersList = async (req, res) => {
  try {
    const { username } = req.user;
    const blockedUsersAggregation = [
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
              $match: {
                isBlocked: true
              }
            },
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
                  },
                ]
              }
            },
            {
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
      },
      {$project: {
        'BlockedList': "$followee.followeeProfile",
        }}
      
    ]
    const user = await User.aggregate(blockedUsersAggregation);
    return res.status(200).json({
      blockedUserList: user
    });

    
  } catch (error) {
    return res.status(500).json({
      msg: error.message,
    });
  }
}


module.exports = {
  followUnfollowUser,
  getFollowersListByUserName,
  getFollowingListByUserName,
  blockOrUnblockUser,
  getBlockedUsersList
};
