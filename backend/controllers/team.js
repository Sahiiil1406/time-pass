const Notification=require('../models/notification.js');
const SocialPost = require('../models/post.js');
const Team=require('../models/team.js');
const User=require('../models/user.js');
const mongoose=require('mongoose');
const { emitSocketEvent } = require('../sockets/socket.js');

const createTeam = async (req, res) => {
    try {
        const { name,description,open,maxSize} = req.body;
        if(!name){
            return res.status(400).json({
                error: 'Please fill in the name',
            });
        }
        const team=await Team.create({
            name,
            members:[req.user._id],
            description,
            open,
            owner:req.user._id,
            maxSize
        });

        return res.status(201).json({
            message: 'Team created successfully',
            team
        });
        

    } catch (error) {
        res.status(400).json({
            error: error.message,
        });
    }
}

const deleteTeam = async (req, res) => {
    try {
        const { id } = req.params;
    
        const existteam=await Team.findById(id);
        if(!existteam){
            return res.status(400).json({
                error: 'Team not found',
            });
        }
        
        if(req.user._id.toString()!==existteam.owner.toString()){
            return res.status(400).json({
                error: 'You are not authorized to delete this team',
            });
        }
    
        const team=await Team.findByIdAndDelete(id);
        return res.status(200).json({
            message: 'Team deleted successfully',
        });
    }
    catch (error) {
        res.status(400).json({
            msg:"Error in deleting team",
            error: error.message,
        });
    }
}

const updateTeam = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, members,description,open,maxSize} = req.body;
        const teams=await Team.findById(id);
        if(teams.owner.toString() !== req.user._id.toString()){
            return res.status(400).json({
                error: 'You are not authorized to update this team',
            });
        }
        const newTeam=await Team.findOneAndUpdate({_id:id,owner:req.user._id},{
            name,
            members,
            description,
            open,
            maxSize
        },{new:true});
        if(!newTeam){
            return res.status(400).json({
                error: 'Team not found',
            });
        }
        return res.status(200).json({
            message: 'Team updated successfully',
            newTeam
        });
    }
    catch (error) {
        res.status(400).json({
            msg:"Error in updating team",
            error: error.message,
        });
    }
}

const teamTaskComplted=async(req,res)=>{
    try {
        const {id}=req.params;
        const team=await Team.findById(id);
        if(!team){
            return res.status(400).json({
                error: 'Team not found',
            });
        }
        if(team.owner.toString()!==req.user._id.toString()){
            return res.status(400).json({
                error: 'You are not authorized to complete task',
            });
        }
        const participants=team.members;
        await User.updateMany({ _id: { $in: participants } }, { $inc: { collaborationCount: 1 } });
        await Team.findByIdAndUpdate(id,{isActive:false});
        participants.forEach(async(participant)=>{
            const notify=new Notification({
                userId:participant,
                notificationType:"team",
                message:`Team ${team.name} task has been completed`
            })
            emitSocketEvent(req,participant.toString(),"NOTIFICATION_EVENT",notify)
            await notify.save()
        })

        return res.status(200).json({
            message: 'Task completed successfully',
        });
    } catch (error) {
        return res.status(400).json({
            error: 'Error in completing task',
            error
        });
    }
}

const getTeam=async(req,res)=>{
    try {
        const {id}=req.params;
        const aggregation=[{
            $match: { _id:new mongoose.Types.ObjectId(id)
             },
           
            },
            {
            $lookup: {
              from: 'users',
              localField: 'owner',
              foreignField: '_id',
              as: 'owner',
              pipeline:[{
               $project:{
                username:1,
                 image:1
               }
              }]
            }
            
        },{
            $addFields: {
                owner: {
                    $arrayElemAt: [
                    '$owner',
                    0
                    ]
                }
            }
        },{
            $lookup: {
              from: 'users',
              localField: 'members',
              foreignField: '_id',
              as: 'member',
              pipeline:[{
               $project:{
                username:1,
                 image:1
               }
              }]
            }
            },
             {
            $project: {
              updatedAt:0,
              __v:0,
              members:0,
            }}]

          const team=await Team.aggregate(aggregation);
            return res.status(200).json({
                message: 'Team fetched successfully',
                team
            });
        
    } catch (error) {
        return res.status(400).json({
            error: 'Error in getting team',
            error
        });
    }
}

const addMemberbyIdThroughPost=async(req,res)=>{
    try {
        const {postId}=req.params;
        const {userId}=req.body;
        const post=await SocialPost.findById(postId);
        if(!post){
            return res.status(404).json({
                error: 'Post not found',
            });
        }
        
        const team=await Team.findById(post.teamId);
        if(!team){
            return res.status(404).json({
                error: 'Team not found',
            });
        }

        if(team.members.length>=team.maxSize){
            return res.status(400).json({
                error: 'Team is full',
            });
        }

        if(team.owner.toString()!==req.user._id.toString()){
            return res.status(400).json({
                error: 'You are not authorized to add member',
            });
        }
        if(team.members.includes(userId)){
            return res.status(400).json({
                error: 'User is already a member of the team',
            });
        }
        team.members.push(userId);
        await team.save();
        const notify=new Notification({
            userId:userId,
            notificationType:"post",
            message:`You have been added to team ${team.name}`,
            postId:post._id
        })
        emitSocketEvent(req,userId.toString(),"NOTIFICATION_EVENT",notify)
        return res.status(200).json({
            message: 'Member added successfully',
        });
        
    } catch (error) {
       return res.status(400).json({
           error:"Error in adding member",
           error
       }) 
    }
}

const getMyTeam=async(req,res)=>{
    try {
        const teams=await Team.find({members:req.user._id,
        isActive:true
        }).sort({createdAt:-1}).populate("name description isActive");


        return res.status(200).json({
            message: 'My team fetched successfully',
            teams
        });
        
    } catch (error) {
        return res.status(400).json({
            error:"Error in getting my team",
            error
        })
    }
}

module.exports = {
    createTeam,
    deleteTeam,
    updateTeam,
    getTeam,
    teamTaskComplted,
    addMemberbyIdThroughPost,
    getMyTeam
}
