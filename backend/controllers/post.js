const User = require("../models/user.js");
const SocialPost = require("../models/post.js");

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
        
        
    } catch (error) {
        return res.status(400).json({
            msg:"Unable to delete Post",
            error
        })
    }
}

const updatePost=async(req,res)=>{
    try {
        
    } catch (error) {
        return res.status(400).json({
            msg:"Unable to update post",
            error
        })
    }
}

const getPost=async(req,res)=>{}

module.exports = {
    createPost,
    deletePost,
    updatePost,
    getPost

}
