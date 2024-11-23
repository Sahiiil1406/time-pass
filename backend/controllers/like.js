const User = require("../models/user.js");
const SocialLike = require("../models/like.js");
const Comment = require("../models/comment.js");
const Post = require("../models/post.js");
const Notification = require("../models/notification.js");
const { emitSocketEvent } = require("../sockets/socket");

const likeUnlikePost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({
        msg: "Post not found",
      });
    }
    console.log(req.user._id)
    const isAlreadyLiked = await SocialLike.findOne({
      $and:[{likedBy: req.user._id},
          {postId: post._id}]
    });
    //console.log(isAlreadyLiked);
    const notify=new Notification({
      userId:post.userId,
      notificationType:"post",
      message:`${req.user.username} liked your post`,
      postId:post._id
    })
    if (isAlreadyLiked) {
      await SocialLike.findOneAndDelete({
        likedBy: req.user._id,
        postId: post._id,
      });
      await Notification.findOneAndDelete({
        userId: post.author.toString(),
        message: `${req.user.username} liked your post`,
        notificationType: "post",
        postId: post._id,
      });
      return res.status(200).json({
        msg: "Unliked successfully",
      });
    } else {
      await SocialLike.create({
        likedBy: req.user._id,
        postId: post._id,
      });
      await notify.save()
      emitSocketEvent(req,post.author.toString(),"NOTIFICATION_EVENT",notify)
      return res.status(200).json({
        msg: "Liked successfully",
      });
    }
  } catch (error) {
    return res.status(500).json({
      msg:"Error occured while liking/unliking post",
      error: error.message,
    });
  }
};

const likeDislikeComment = async (req, res) => {
  try {
    const commentId = req.params.commentId;
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({
        msg: "Comment not found",
      });
    }
    const isAlreadyLiked = await SocialLike.findOne({
      $and:[{likedBy: req.user._id},
        {postId: comment._id}]
    });

    if (isAlreadyLiked) {
      await SocialLike.findOneAndDelete({
        likerId: req.user._id,
        commentId: comment._id,
      });
      //console.log("Disliked successfully")
      return res.status(200).json({
        msg: "Disliked successfully",
      });
    } else {
      await SocialLike.create({
        likedBy: req.user._id,
        commentId: comment._id,
      });
      return res.status(200).json({
        msg: "Liked successfully",
      });
    }
  } catch (error) {
    return res.status(500).json({
      msg: error.message,
    });
  }
};

const likeUnlikePoll= async (req, res) =>{
  try {
    const pollId = req.params.pollId;
    const isAlreadyLiked = await SocialLike.findOne({
      $and:[{likedBy: req.user._id},
          {pollId: pollId}]
    });
    
    if (isAlreadyLiked) {
      await SocialLike.findOneAndDelete({
        likedBy: req.user._id,
        pollId: pollId,
      });
      await Notification.findOneAndDelete({
        userId: poll.author.toString(),
        message: `${req.user.username} liked your poll`,
        notificationType: "poll",
        pollId: poll._id,
      });
      return res.status(200).json({
        msg: "Unliked successfully",
      });
    } else {
      await SocialLike.create({
        likedBy: req.user._id,
        pollId: pollId,
      });
      const notify=new Notification({
        userId:poll.author,
        notificationType:"poll",
        message:`${req.user.username} liked your poll`,
        pollId:pollId
      })
      await notify.save()
      emitSocketEvent(req,poll.author.toString(),"NOTIFICATION_EVENT",notify)

      return res.status(200).json({
        msg: "Liked successfully",
      });
    } 
    
  } catch (error) {
    return res.status(500).json({
      msg: error.message,
    });
  }
}

module.exports = {
  likeUnlikePost,
  likeDislikeComment,
  likeUnlikePoll
};
