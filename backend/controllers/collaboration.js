const {emitSocketEvent}=require('../sockets/socket')
const Collaboration = require('../models/collaboration');
const mongoose = require('mongoose');
const Notification = require('../models/notification');
const SocialPost = require('../models/post');
const {getDistance}=require('geolib')

const markAndUnmarkCollaboration = async (req, res) => {
    try {
        
        const {postId}=req.params
        const {message}=req.body
        const userId=req.user._id

        const post=await SocialPost.findById(postId)
        if(!post){
            return res.status(404).json({
                msg: "Post not found"
        });}
        
        const collaboration = await Collaboration.findOne({
            $and: [{ postId }, { userId }]
        });
        
        if(collaboration){
            await Collaboration.findOneAndDelete({
                postId,
                userId,
            });
            await Notification.findOneAndDelete({
                userId:post.author,
                notificationType:"post",
                message:`${req.user.username} marked collaboration on your post`,
                postId:post._id    
            })
  
            return res.status(200).json({
                msg: "Collaboration unmarked successfully"
            });
        }else{
            await Collaboration.create({
                postId,
                userId,
                message
            });
            const notify=new Notification({
              userId:post.author,
              notificationType:"post",
              message:`${req.user.username} marked collaboration on your post`,
              postId:post._id    
          })
          await notify.save()
          emitSocketEvent(req,post.author.toString(),"NOTIFICATION_EVENT",notify)
            return res.status(200).json({
                msg: "Collaboration marked successfully"
            });
        }
        
    } catch (error) {
        return res.status(400).json({
            msg: "Error in marking/unmarking collaboration",
            error: error
        });
    }
}
const getCollaboratorListByPostId = async (req, res) => {
    try {
        const {postId}=req.params
        const page=parseInt(req.query.page) || 1
        const collaboratorAgrregation=[{
          $project: {
            userId:1,
            message:1,
            _id:0
          }
          },{
          $lookup: {
            from: 'users',
            localField: 'userId',
            foreignField: '_id',
            as: 'users'
          }},{
          $addFields: {
            username:'$users.username',
            bio:'$users.bio',
            location:'$users.location',
            image:'$users.image'
          }},{
          $addFields: {
            username:{
               $arrayElemAt:['$username',0]
            },
            bio:{
               $arrayElemAt:['$bio',0]
            },
            image:{
               $arrayElemAt:['$image',0]
            },
            location:{
               $arrayElemAt:['$location',0]
            },
          }},{
            $project: {
              users:0
            }
          },{
            $skip:(page-1)*10
          },{
            $limit:10
          }]
        
        const collaborators = await Collaboration.aggregate(collaboratorAgrregation);

        for (let user of collaborators) {
          if (req.user.location.coordinates[0] === 0 && req.user.location.coordinates[1] === 0) {
            user.location = null;
            break;
          } else {
            if (!user.location || user.location.coordinates[0] == 0 && user.location.coordinates[1] == 0) {
              user.location = null;
            } else {
              const lat1 = req.user.location.coordinates[0];
              const lon1 = req.user.location.coordinates[1];
              const lat2 = user.location.coordinates[0];
              const lon2 = user.location.coordinates[1];
              let distance = getDistance(
                { latitude: lat1, longitude: lon1 }, 
                { latitude: lat2, longitude: lon2 }
              ) / 1000;
              if (Math.floor(distance) == 0) {
                distance = 1;
              }
              
              user.location = Math.floor(distance);
              
            }
          }
        }
        return res.status(200).json({
            msg: "Collaborator list fetched successfully",
            collaborators
        });
    } catch (error) {
        return res.status(400).json({
            msg: "Error in getting collaborator list",
            error: error
        });
    }
}

module.exports = {
    markAndUnmarkCollaboration,
    getCollaboratorListByPostId
}