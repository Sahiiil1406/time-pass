const Poll = require("../models/polls");
const PollVotes = require("../models/pollVotes");
const mongoose = require("mongoose");
const SocialComment = require("../models/comment");
const SocialLike = require("../models/like");

const createPoll=async(req,res)=>{
    try {
        const {question,options,category,communityId}=req.body
        if(!question || !options){
            return res.status(400).json({
                msg:"Please enter all fields"
            })
        }
        const poll=await Poll.create({
            question,
            options,
            category,
            communityId,
            author:req.user._id
        })
        return res.status(200).json({
            poll,
            msg:"Poll Created Successfully"
        })
        
    } catch (error) {
        return res.status(500).json({
            error,
            msg: "Poll Not Created Successfully",
        });
    }
}

const deletePoll=async(req,res)=>{
   try {
    const pollId = req.params.pollId;
    const poll = await Poll.findById(pollId);
    if (!poll) {
        return res.status(404).json({
            msg: "Poll not found",
        });
    }
    if(poll.author.toString()!==req.user._id.toString()){
        return res.status(401).json({
            msg:"You are not authorized to delete this poll"
        })
    }
    await Poll.findByIdAndDelete(pollId);
    await PollVotes.deleteMany({
        pollId: pollId,
      });

    await SocialComment.deleteMany({
        pollId: pollId,
      });  

    await SocialLike.deleteMany({
        pollId: pollId,
      }); 
      
      
    return res.status(200).json({
        msg: "Poll Deleted Successfully",
    });
    
   } catch (error) {
    return res.status(500).json({
        error,
        msg: "Poll Not Deleted Successfully",
    });
   }
}

const updatePoll=async(req,res)=>{
    try {
        const {question,options,category,communityId}=req.body
        const pollId = req.params.pollId;
        const poll = await Poll.findById(pollId);
        if (!poll) {
            return res.status(404).json({
                msg: "Poll not found",
            });
        }
        if(poll.author.toString()!==req.user._id.toString()){
            return res.status(401).json({
                msg:"You are not authorized to update this poll"
            })
        }

        await Poll.findByIdAndUpdate(pollId, {
            question,
            options,
            category,
            communityId,
        }
        )
        return res.status(200).json({
            msg: "Poll Updated Successfully",
        });
        
    } catch (error) {
        return res.status(500).json({
            error,
            msg: "Poll Not Updated Successfully",
        });
    }
}

const voteUnvoteFeedPoll=async(req,res)=>{
    try {
        const {pollId}=req.params
        const {option}=req.body

        const pollAlreadyVoted=await PollVotes.findOne({
            $and:[{pollId},{userId:req.user._id}]
        })
        if(pollAlreadyVoted){
            const poll=await Poll.findById(pollId)
            const textIndex=poll.options.findIndex((opt)=>opt.text===pollAlreadyVoted.option)
            if(textIndex===-1){
                return res.status(404).json({
                    msg:"Option not found"
                })
            }
            await PollVotes.findOneAndDelete({
                pollId,
                userId:req.user._id
            })
            await PollVotes.create({
                pollId,
                userId:req.user._id,
                option:pollAlreadyVoted.option
            })
            
            return res.status(200).json({
                poll,
                msg:"Poll Vote changed Successfully"
            })
        }

        const poll=await Poll.findById(pollId)
        if(!poll){
            return res.status(404).json({
                msg:"Poll not found"
            })
        }
        const textIndex=poll.options.findIndex((opt)=>opt.text===option)
        if(textIndex===-1){
            return res.status(404).json({
                msg:"Option not found"
            })
        }
        poll.options[textIndex].votes+=1
        await poll.save()
        const pollVotes=await PollVotes.create({
            pollId,
            userId:req.user._id,
            option
        })
        return res.status(200).json({
            poll,
            msg:"Poll Voted Successfully"
        })
        
    } catch (error) {
        return res.status(500).json({
            error,
            msg: "Poll Not Voted/Unvoted Successfully",
        });
    }
}

const getPollsbyId=async(req,res)=>{
    try {
        const pollId = req.params.pollId;
        const getPollAggregated=[
            {
              $lookup: {
                from: "users",
                localField: "author",
                foreignField: "_id",
                as: "profile",
                pipeline:[{
                 $project:{
                 username:1,
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
            profile:{$arrayElemAt:["$profile",0]},
            likeCount:{
              $size:"$likes"
            },
          commentCount:{
          $size:"$comment"}
          }
        },{
              $project: {
                likes:0,
                comment:0
              }
          }
          ] 
        const poll= await Poll.aggregate([
            {
              $match: {
                _id: new mongoose.Types.ObjectId(pollId)
              }
            },
            ...getPollAggregated
        ])

        const isVoted=await PollVotes.findOne({
            pollId:pollId,
            userId:req.user._id
        })
        
        if(isVoted){
            poll[0].voted=isVoted.option
        }
        const isLiked=await SocialLike.findOne({
            pollId:pollId,
            likedBy:req.user._id
        })

        if(isLiked){
            poll[0].isLiked=true
        }
        return res.status(200).json({
            poll,
            msg: "Get Post by Id",
        });
    } catch (error) {
        return res.status(500).json({
            error,
            msg: "Error in getting Found",
        });
    }
}

module.exports={
    createPoll,
    getPollsbyId,
    deletePoll,
    updatePoll,
    voteUnvoteFeedPoll
}