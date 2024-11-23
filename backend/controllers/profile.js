const SocialFollow = require("../models/follow.js");
const User = require("../models/user.js");
const SocialPost = require("../models/post.js");
const Poll = require("../models/polls.js");
const SocialLike = require("../models/like.js");
const {getDistance}=require('geolib')


const getUserByusername = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({
        msg: "User NOt found",
      });
    }
    const aggregateUserProfile=[
      {
        '$match': {
          'username': username
        }
      }, {
        '$lookup': {
          'from': 'socialfollows', 
          'localField': '_id', 
          'foreignField': 'followerId', 
          'as': 'following'
        }
      }, {
        '$lookup': {
          'from': 'socialfollows', 
          'localField': '_id', 
          'foreignField': 'followeeId', 
          'as': 'follower'
        }
      }, {
        '$addFields': {
          'followerCount': {
            '$size': '$follower'
          }, 
          'followingCount': {
            '$size': '$following'
          }
        }
      }, {
        '$project': {
          'follower': 0, 
          'following': 0, 
          '__v': 0, 
          'password': 0, 
          'updatedAt': 0, 
          'createdAt': 0
        }
      }
    ]
    
  const fullUser=await User.aggregate(aggregateUserProfile)
  
  const isFollowing = await SocialFollow.findOne({
    followerId: req.user._id,
    followeeId: user._id,
  }) || false
  

 
  if (isFollowing) {
    fullUser[0].isFollowing = true;
  }else{
    fullUser[0].isFollowing=false
  }
  
  if(req.user.location.coordinates[0]==0 && req.user.location.coordinates[1]==0 ){
    fullUser[0].location=null
  }else{
   if(fullUser[0].location.coordinates[0]!=0 && fullUser[0].location.coordinates[1]!=0){
     
   const lat1=req.user.location.coordinates[0]
   const lon1=req.user.location.coordinates[1]

   const lat2=fullUser[0].location.coordinates[0]
   const lon2=fullUser[0].location.coordinates[1]
   
   let x=getDistance({latitude:lat1,longitude:lon1},{latitude:lat2,longitude:lon2})/1000
   
   if(Math.floor(x)>0 && Math.floor(x)<1){
    x=1
   }
   fullUser[0].location=Math.floor(x);
   }else{
      fullUser[0].location=null
    
   }
  }

  
    return res.status(200).json({
      msg: "User profile fetched successfully",
      fullUser
    });
  } catch (error) {
    return res.status(400).json({
      msg: "Error in retrieving user",
      error,
    });
  }
};

const mainfeed=async(req,res)=>{
  try {

    const posts=await SocialPost.aggregate([{
      $match: {
        createdAt:{
          $gte:new Date(Date.now()-24*60*60*1000*15*365)
        }
      }
    }, {
        '$lookup': {
          'from': 'users', 
          'localField': 'author', 
          'foreignField': '_id', 
          'as': 'profile', 
          'pipeline': [
            {
              '$project': {
                'username': 1, 
                'coverImage': 1,
                image:1
              }
            }
          ]
        }
      }, {
        '$lookup': {
          'from': 'sociallikes', 
          'localField': '_id', 
          'foreignField': 'postId', 
          'as': 'likes'
        }
      }, {
        '$lookup': {
          'from': 'socialcomments', 
          'localField': '_id', 
          'foreignField': 'postId', 
          'as': 'comment'
        }
      }, {
        '$addFields': {
          'likeCount': {
            '$size': '$likes'
          }, 
          'commentCount': {
            '$size': '$comment'
          },
        type:"post",
        'profile':{$arrayElemAt:["$profile",0]}
      }
      }, {
        '$project': {
          'author': 0, 
          '__v': 0, 
          'updatedAt': 0, 
          'likes': 0, 
          'comment': 0
        }
      }])


    const polls=await Poll.aggregate([
      {
        $match: {
          createdAt:{
            $gte:new Date(Date.now()-24*60*60*1000*4*365)
          }
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "author",
          foreignField: "_id",
          as: "profile",
          pipeline:[{
           $project:{
           username:1,
             coverImage:1,
             image:1
           }
          }]
        }
      },{
        $project: {
          __v:0,
          createdAt:0,
          updatedAt:0,
        author:0,
        communityId:0
        }
      },{
    
      $lookup: {
        from: "sociallikes",
        localField: '_id',
        foreignField: 'pollId',
        as: "likes"
      }},{
        $lookup: {
          from: "socialcomments",
          localField: "_id",
          foreignField: "pollId",
          as: "comment"
        }
      },{
    $addFields: {
      likeCount:{
        $size:"$likes"
      },
      type:"poll",
    commentCount:{
    $size:"$comment"},
    'profile':{$arrayElemAt:["$profile",0]}
    
    }},{
        $project: {
          likes:0,
          comment:0
        }
    }

    ])

    //shuffle the posts
    const d=[...posts,...polls]
    const shuffled=d.sort(()=>Math.random()-0.5)
    return res.status(200).json({
      data:shuffled,
      msg:"Main feed fetched successfully"
    })

    
    
  } catch (error) {
    return res.json({
      err:error,
      msg:"Error in getting main feed",
      error
    })
  }
}

const checkUsernameUnique=async(req,res)=>{
  try {
    const {username}=req.body
    const user=await User.findOne({username})
    if(user){
      return res.json({
        msg:"Username already taken",
        success:false
      })
    }
    return res.json({
      msg:"Username available",
      success:true
    })
    
  } catch (error) {
    return res.json({
      err:error,
      msg:"Error in checking Name"
    })
  }
}

module.exports = { getUserByusername ,mainfeed,checkUsernameUnique};
