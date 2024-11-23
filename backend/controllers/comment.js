const User = require("../models/user.js");
const SocialLike = require("../models/like.js");
const SocialPost = require("../models/post.js");
const SocialComment = require("../models/comment.js");
const mongoose = require("mongoose");
const { emitSocketEvent } = require("../sockets/socket");
const Notification = require("../models/notification.js");

const addPostComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const { content } = req.body;

    const post = await SocialPost.findById(postId)
    if(!post){
      return res.status(404).json({
        msg: "Post Not Found",
      });
    }
  
    const comment = await SocialComment.create({
      postId,
      content,
      author: req.user._id,
    });
    const notify=await Notification.create({
      userId:post.author,
      notificationType:"post",
      message:`${req.user.username} commented on your post`,
      postId:post._id    
    })

    emitSocketEvent(req,post.author.toString(),"NOTIFICATION_EVENT",notify)

    return res.status(200).json({
      comment,
      msg: "Comment Added Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error,
      msg: "Comment Not Added Successfully",
    });
  }
};

const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params

    const comment = await SocialComment.findByIdAndDelete(commentId);
    if (comment) {
      const childComments =await SocialComment.find({parentComment:commentId});
      for(let childComment of childComments) {
        await deleteCommentAndReplies(childComment._id);
      }
    }
    return res.status(200).json({
      msg: "Comment Deleted Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error,
      msg: "Comment Not Deleted Successfully",
    });
  }
};
const updateComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { content } = req.body;
    const comment = await SocialComment.findByIdAndUpdate(
      commentId,
      { content },
      { new: true }
    );
    return res.status(200).json({
      comment,
      msg: "Comment Updated Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error,
      msg: "Comment Not Updated Successfully",
    });
  }
};

const addPollComment = async (req, res) => {
  try {
    const { pollId } = req.params;
    const { content } = req.body;

    const poll = await SocialPost.findById(pollId)
    if(!poll){
      return res.status(404).json({
        msg: "Poll Not Found",
      });
    }

    const comment = await SocialComment.create({
      pollId,
      content,
    });
    const notify=await Notification.create({
      userId:poll.author,
      notificationType:"poll",
      message:`${req.user.username} commented on your poll`,
      pollId:poll._id
    })
    emitSocketEvent(req,poll.author.toString(),"NOTIFICATION_EVENT",notify)
    return res.status(200).json({
      comment,
      msg: "Comment Added Successfully",
    });
    
  } catch (error) {
    return res.status(500).json({
      error,
      msg: "Comment Not Added Successfully",
    });
  }
}

const getPostComments = async (req, res) => {
  try {
    const { postId } = req.params;
    
    const comment=await SocialComment.find({postId:postId,
      parentComment:null
    }).populate("author",'username image')
    .populate("replies")
    .select("-__v -postId -pollId -communityContentId ")  
    //add likes count to each comment
    
    return res.status(200).json({
      msg: "Post Comments Fetched Successfully",
      comment
    });
    
  } catch (error) {
    return res.status(500).json({
      error,
      msg: "Error in fetching Post comments",
    });
  }
}
const getPollComments = async (req, res) => {
  try {
    const { pollId } = req.params;

    const comments=await SocialComment.find({pollId:pollId,
      parentComment:null
    }).populate("author",'username image')
    .populate("replies")
    .select("-__v -postId -pollId -communityContentId ")

    return res.status(200).json({
      comments,
      msg: "Poll Comments Fetched Successfully",
    });
    
  } catch (error) {
    return res.status(500).json({
      error,
      msg: "Error in fetching Poll comments",
    });
  }
}

const addRepliestoComment=async(req,res)=>{
  try {
    const { parentCommentId } = req.body;
    const { content } = req.body;
    const parentComment=await SocialComment.findById(parentCommentId)
    if(!parentComment){
      return res.status(404).json({
        msg: "Comment Not Found",
      });
    }
    
    const comment = await SocialComment.create({
      parentComment:parentCommentId,
      content,
      pollId:parentComment.pollId,
      postId:parentComment.postId,
      author: req.user._id,
    });
    await SocialComment.findOneAndUpdate({_id:parentCommentId},{$push:{replies:comment._id}})
    const notify=await Notification.create({
      userId:parentComment.author,
      notificationType:"postandpoll",
      message:`${req.user.username} replied to your comment`,
      postId:parentComment.postId,
      pollId:parentComment.pollId
    })
    emitSocketEvent(req,parentComment.author.toString(),"NOTIFICATION_EVENT",notify)
    
    return res.status(200).json({
      comment,
      msg: "Replies Added Successfully",
    });

  } catch (error) {
    return res.status(500).json({
      error,
      msg: "Error in adding replies",
    });
  }
}

module.exports = {
  addPostComment,
  getPostComments,
  deleteComment,
  updateComment,
   addPollComment,
  getPollComments,
  addRepliestoComment
};
