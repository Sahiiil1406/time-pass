const User = require("../models/user.js");
const SocialLike = require("../models/like.js");
const SocialComment = require("../models/comment.js");

const addComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const { content } = req.body;

    const comment = await SocialComment.create({
      postId,
      content,
      user: req.user._id,
    });
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
    const { commentId } = req.params;
    const comment = await SocialComment.findByIdAndDelete(commentId);
    return res.status(200).json({
      comment,
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

const getPostComments = async (req, res) => {};

module.exports = {
  addComment,
  getPostComments,
  deleteComment,
  updateComment,
};
