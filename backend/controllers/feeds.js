const { mongoose } = require('mongoose')
const SocialFollow = require('../models/follow.js')
const SocialPost=require('../models/post.js')
const Poll=require('../models/polls.js') 



const trendingPosts = async (req, res) => {
    try {
        const aggregation=[
          {
            $match: {
              createdAt:{
                $gte:new Date(Date.now()-24*60*60*1000*4)
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
                      'coverImage': 1
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
                }
              }
            }, {
              '$project': {
                'author': 0, 
                '__v': 0, 
                'updatedAt': 0, 
                'likes': 0, 
                'comment': 0
              }
            }, {
              '$sort': {
                'likeCount': -1,
                'commentCount':-1
              }
            },{
              $limit:25
            }
          ]

        const posts = await SocialPost.aggregate(aggregation)
        return res.status(200).json({
            posts: posts,
            msg:"Trending posts fetched successfully"
        })
        
    } catch (error) {
        return res.status(500).json({
            err: error,
            msg:"Error in getting trending posts"
        })
    }
}

const followingPost= async (req, res) => {
    try {
        const id=req.user._id
        const followingList=await SocialFollow.find({
            followerId:id
        })
        const followeeIdArray=followingList.map((e)=>{
            return  e.followeeId;
        })
        //console.log(followeeIdArray)

        const aggregation=[ {
              '$lookup': {
                'from': 'users', 
                'localField': 'author', 
                'foreignField': '_id', 
                'as': 'profile', 
                'pipeline': [
                  {
                    '$project': {
                      'username': 1, 
                      'coverImage': 1
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
                }
              }
            }, {
              '$project': {
                'author': 0, 
                '__v': 0, 
                'updatedAt': 0, 
                'likes': 0, 
                'comment': 0
              }
            },
          ]
         
          const posts = await SocialPost.aggregate([
            {
              $match: {
                author: { $in: followeeIdArray },
              }
            },{
              $match:{
                createdAt:{
                  $gte:new Date(Date.now()-24*60*60*1000*7)
                }
              }
            },
            ...aggregation
          ]);
        
        //shuffling the posts
        posts.sort(() => Math.random() - 0.5);
        return res.status(200).json({
            msg:"Successfully gathered feed",
            posts
        })
        
    } catch (error) {
        return res.json({
            err: error,
            msg: "Error in getting following feed"
        })
    }
}

const trendingPoll=async(req,res)=>{
  try {
    const aggregation=[
      {
        $match: {
          createdAt:{
            $gte:new Date(Date.now()-24*60*60*1000*4)
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
             coverImage:1
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
    commentCount:{
    $size:"$comment"}
    }},{
        $project: {
          likes:0,
          comment:0
        }
    },{
      $sort: {
        likeCount:-1,
        commentCount:-1
      }
    }
    ] 

    const polls= await Poll.aggregate(aggregation)
    return res.status(200).json({
      polls:polls,
      msg:"Trending polls fetched successfully"
    })
    
  } catch (error) {
    return res.json({
      err:error,
      msg:"Error in getting trending polls"
    })
  }
}

const followingPoll=async(req,res)=>{
  try {
    const id=req.user._id
    const followingList=await SocialFollow.find({
        followerId:id
    })
    const followeeIdArray=followingList.map((e)=>{
        return  e.followeeId;
    })

    const aggregation=[{
      $match: {
        createdAt:{
          $gte:new Date(Date.now()-24*60*60*1000*7)
        }
      }
    },{
      $match: {
        author: { $in: followeeIdArray },
        isBlocked:false || null
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
             coverImage:1
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
    commentCount:{
    $size:"$comment"}
    }},{
        $project: {
          likes:0,
          comment:0
        }
    }
    ] 
    const polls= await Poll.aggregate(aggregation)
    posts.sort(() => Math.random() - 0.5);
    return res.status(200).json({
      polls:polls,
      msg:"Following polls fetched successfully"
    })
    
  } catch (error) {
    return res.json({
      err:error,
      msg:"Error in getting following polls"
    })
  }
}

module.exports = {
    trendingPosts,
    followingPost,
    trendingPoll,
    followingPoll,  
}