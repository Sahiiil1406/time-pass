const User = require("../models/user.js");
const SocialPost = require("../models/post.js");
const SocialLike = require("../models/like.js");
const mongoose = require("mongoose");

const createPost = async (req, res) => {
    try {
        const { content,tags } = req.body;
        const post = await SocialPost.create({
        tags,
        content,
        author: req.user._id,
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
        const {content,tags}=req.body
        const post=await SocialPost.findByIdAndUpdate(postId)
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

const getPost=async(req,res)=>{
    try {
        const {postId}=req.params
        console.log(postId)
    
        const postAggregation=[
            {
                $match: {
                  _id:new mongoose.Types.ObjectId(postId)
                }
              },
            {
              $lookup: {
                from: "sociallikes",
                localField: "_id",
                foreignField: "postId",
                as: "likes",
              },
            },
           {
              $lookup: {
                from: "socialcomments",
                localField: "_id",
                foreignField: "postId",
                as: "comment",
               /*  pipeline: [
                  {
                    $lookup: {
                      from: "users",
                      localField: "author",
                      foreignField: "_id",
                      as: "commentUser",
                    },
                  },
                ], */
              },
            },
            {
              $lookup: {
                from: "users",
                localField: "author",
                foreignField: "_id",
                as: "owner",
              },
            },
            {
              $addFields: {
                likesCount: {
                  $size: "$likes",
                },
                commentCount: {
                  $size: "$comment",
                },
              },
            },
            {
            
              $project: {
               author: 0,
               likes: 0,
                comment: 0,
                },   
            }
          ]
        const post = await SocialPost.aggregate(postAggregation);
        /* const temp=await SocialLike.findOne({
            author:req.user._id,
            postId:post._id})
            console.log(temp)
       const isLiked=false
        if(temp){
            isLiked=true
        } */
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



module.exports = {
    createPost,
    deletePost,
    updatePost,
    getPost
}
