const User = require("../models/user.js");
const SocialPost = require("../models/post.js");
const SocialLike = require("../models/like.js");
const mongoose = require("mongoose");
const SocialComment = require("../models/comment.js");
const Bookmark=require("../models/bookmark.js")

const createPost = async (req, res) => {
    try {
        const { content,tags,teamId,collaboration,communityId,type } = req.body;
        const post = await SocialPost.create({
        tags,
        content,
        author: req.user._id,
        collaboration,
        teamId,
        communityId,
        type
        });
        return res.status(200).json({
        post,
        msg: "Post Created Successfully",
        });
    } catch (error) {
        return res.status(500).json({
        error,
        msg: "Post Not Created Successfully",
        });
    }
}
const deletePost=async(req,res)=>{
    try {
        const {postId}=req.params
        const post=await SocialPost.findByIdAndDelete(postId)
        await SocialLike.deleteMany({
            postId: postId,
          });

        await SocialComment.deleteMany({
            postId: postId,
          });  

        await Bookmark.deleteMany({
            postId: postId,
          });  
        return res.status(200).json({
            post,
            msg:"Post deleted successfully"
        })
        
    } catch (error) {
        return res.status(400).json({
            msg:"Unable to delete Post",
            error
        })
    }
}

const updatePost=async(req,res)=>{
    try {
        const {postId}=req.params
        const {content,tags,collaboration,teamId,type}=req.body
        const post=await SocialPost.findById(postId)
        if(!post){
            return res.status(404).json({
                msg:"Post not found"
            })
        }
        if(post.author.toString()!==req.user._id.toString()){
            return res.status(401).json({
                msg:"You are not authorized to update this post"
            })
        }
        post.content=content
        post.tags=tags
        post.collaboration=collaboration
        post.teamId=teamId
        post.type=type
        await post.save()

        return res.status(200).json({
            post,
            msg:"Post updated successfully"
        })
        
    } catch (error) {
        return res.status(400).json({
            msg:"Unable to update post",
            error
        })
    }
}

const getPostbyId=async(req,res)=>{
    try {
        const {postId}=req.params
        //console.log(postId)
    
        const postAggregation=[{
            $match: {
                '_id':new mongoose.Types.ObjectId(postId)
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
                    'image':1,
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
          }]
        const post = await SocialPost.aggregate(postAggregation);
        const isLiked = await SocialLike.findOne({
            postId: postId,
            userId: req.user._id,
          });
        if (isLiked) {
            post[0].isLiked = true;
        }
        return res.status(200).json({
            post,
            msg:"Post fetched successfully"
        })

    } catch (error) {
        return res.status(400).json({
            msg:"Unable to get post",
            error
        })
    }
}

const getPostOfUser=async(req,res)=>{
    try {
        const {username}=req.params
        const user=await User.findOne({username})
        if(!user){
            return res.status(404).json({
                msg:"User not found"
            })
        }
        const posts=await SocialPost.find({author:user._id})
        return res.status(200).json({
            posts,
            msg:"Posts fetched successfully"
        })
    }
    catch (error) {
        return res.status(400).json({
            msg:"Unable to get posts",
            error
        })
    }
}

module.exports = {
    createPost,
    deletePost,
    updatePost,
    getPostbyId,
    getPostOfUser
}
