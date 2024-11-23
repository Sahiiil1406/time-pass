const Community = require('../models/community');
const CommunityMember = require('../models/communityMember');
const mongoose = require('mongoose');
const SocialPost = require("../models/post.js");
const Poll = require('../models/polls.js');
const Notification = require('../models/notification.js');
const {emitSocketEvent}=require('../sockets/socket');
const {getDistance}=require('geolib')


const createCommunity = async (req, res) => {
    try {
        const { name, category, description ,image} = req.body;
        const owner = req.user._id;
        if(name.trim()==="" || category.trim()===""){
            return res.status(400).json({
                msg:"Please provide appropriate details"
            })
        }
        const community = await Community.create({
            name,
            category,
            description,
            owner,
            image
        });
        await CommunityMember.create({
            communityId: community._id,
            memberId: owner,
            role: 'admin',
        });

        return res.status(201).json({
            message: 'Community created successfully',
            community,
        });

    } catch (error) {
        res.status(400).json({
            msg: 'Error in creating community',
            error: error.message,
        });
    }
}

const updateCommunity = async (req, res) => {
    try {
        const {communityId}=req.params
        const {name,category,description,image}=req.body
        const community=await Community.findById(communityId)
        if(!community){
            return res.status(400).json({
                msg:"Community doesnot exist"
            })
        }

       const check=await CommunityMember.findOne({
              communityId,
              memberId:req.user._id,
              role:"admin"
       })
       if(!check){
              return res.status(400).json({
                msg:"You are not authorized to update this community"
              })
       }
        const updatedCommunity=await Community.findByIdAndUpdate
        (communityId,{name,category,description,image},{new:true})
        
        
        return res.status(200).json({
            message:"Community updated successfully",
            updatedCommunity
        })
        }

    catch (error) {
        res.status(400).json({
            msg: 'Error in updating community',
            error: error.message,
        });
    }
}

const deleteCommunity = async (req, res) => {
    try {
        const {communityId}=req.params
        const community=await Community.findById(communityId)
        if(!community){
            return res.status(400).json({
                msg:"Community doesnot exist"
            })
        }
        const check=await CommunityMember.findOne({
            communityId,
            memberId:req.user._id,
            role:"admin"
        })
        if(!check){
            return res.status(400).json({
              msg:"You are not authorized to delete this community"
            })
        }
        await Community.findByIdAndDelete(communityId)
        await CommunityMember.deleteMany({communityId:communityId})
        return res.status(200).json({
            message:"Community deleted successfully"
        })
    }
    catch (error) {
        res.status(400).json({
            msg: 'Error in deleting community',
            error: error.message,
        });
    }
}
const addorRemoveMember = async (req, res) => {
    try {
        const {communityId}=req.params
        const {memberId}=req.body
        const check=await Community.findById(communityId) || false
        if(!check){
            return res.status(400).json({
                msg:"Community doesnot exist"
            })}
        
        const community=await CommunityMember.findOne({
            communityId,
            memberId
        })
        const checkAdmin=await CommunityMember.findOne({
            communityId,
            memberId:req.user._id,
            role:"admin"
        })
        if(!checkAdmin){
            return res.status(400).json({
              msg:"You are not authorized to add or remove member from this community"
            })
        }
        if(community){
            await CommunityMember.findByIdAndDelete(community._id)
            const x=await Notification.create({
                userId:memberId,
                notificationType:"community",
                message:`You are removed from  ${check.name} community`
            })
            emitSocketEvent(req,memberId.toString(),'NOTIFICATION_EVENT',x)
            return res.status(200).json({
                message:"Member removed successfully"
            })
        }

        await CommunityMember.create({
            communityId,
            memberId
        })
        
        const notify=await Notification.create({
            userId:memberId,
            notificationType:"community",
            message:`You are added to ${check.name} community`
        })
        emitSocketEvent(req,memberId.toString(),'NOTIFICATION_EVENT',notify)
        return res.status(200).json({
            message:"Member added successfully"
        })

        
    } catch (error) {
        return res.status(400).json({
            msg: 'Error in adding or removing member',
            error: error.message,
        });
    }
}
const addorRemoveAdmin = async (req, res) => {
    try {
        const {communityId}=req.params
        const {memberId}=req.body

        const check=await Community.findById(communityId) || false
        if(!check){
            return res.status(400).json({
                msg:"Community doesnot exist"
            })
        }

        const checkMember=await CommunityMember.findOne({
            communityId,
            memberId:req.user._id,

        })
        if(!checkMember){
            return res.status(400).json({
                msg:"You are not a Member  in this community."
            })
        }
        if(checkMember.role!=="admin"){
            return res.status(400).json({
                msg:"You are not authorized to add or remove admin from this community"
            })
        }
        const membertobeAdded=await CommunityMember.findOne({
            communityId,
            memberId
        })
        if(!membertobeAdded){
            return res.status(400).json({
                msg:"Member doesnot exist in this community"
            })
        }
        if(membertobeAdded.role==="admin"){
            await CommunityMember.findByIdAndUpdate(checkMember._id,{role:"member"})
            const x=await Notification.create({
                userId:memberId,
                notificationType:"community",
                message:`You are removed from admin of ${check.name} community`
            })
            emitSocketEvent(req,memberId.toString(),'NOTIFICATION_EVENT',x)
            return res.status(200).json({
                message:"Admin removed successfully"
            })
        }

        await CommunityMember.findByIdAndUpdate(checkMember._id,{role:"admin"})
        const notify=await Notification.create({
            userId:memberId,
            notificationType:"community",
            message:`You are added to admin of ${check.name} community`
        })
        emitSocketEvent(req,memberId.toString(),'NOTIFICATION_EVENT',notify)

        return res.status(200).json({
            message:"Admin added successfully"
        })
        
    } catch (error) {
        return res.status(400).json({
            msg: 'Error in adding or removing admin',
            error: error.message,
        });
    }
}
const getCommunityMembers = async (req, res) => {
    try {
        const {communityId}=req.params
        const page=parseInt(req.query.page) || 1
        const aggregation=[{
            $match: {
              communityId:new  mongoose.Types.ObjectId(communityId),
              role:'member'
            }
          },{
          $project: {
            memberId:1,role:1,_id:0
          }
          },{
            $lookup: {
              from: 'users',
              localField: 'memberId',
              foreignField: '_id',
              as: 'members'
            }
          },{
          $addFields: {
            username:'$members.username',
            bio:'$members.bio',
            image:'$members.image',
            location:'$members.location'
          }},{
          $addFields: {
            username: {
          $arrayElemAt:['$username',0]},
            bio: {
          $arrayElemAt:['$bio',0]},
            location: {
          $arrayElemAt:['$location',0]},
            image: {
          $arrayElemAt:['$image',0]},
            _id:'$memberId'
          }},{
          $project: {
            members:0,
            memberId:0
          }},{
              $skip:(page-1)*10
             },{
                $limit:10
          }]


        const members=await CommunityMember.aggregate(aggregation)
        for (let user of members) {
            
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
            message:"Community members fetched successfully",
            members
        })
        
    } catch (error) {
        return res.status(400).json({
            msg: 'Error in getting community members',
            error: error.message,
        });
    }
}
const getCommunityAdmins = async (req, res) => {
    try {
        const {communityId}=req.params
        const page=parseInt(req.query.page) || 1
        const aggregation=[{
            $match: {
              communityId:new  mongoose.Types.ObjectId(communityId),
              role:'admin'
            }
          },{
          $project: {
            memberId:1,role:1,_id:0
          }
          },{
            $lookup: {
              from: 'users',
              localField: 'memberId',
              foreignField: '_id',
              as: 'members'
            }
          },{
          $addFields: {
            username:'$members.username',
            bio:'$members.bio',
            image:'$members.image',
            location:'$members.location'
          }},{
          $addFields: {
            username: {
          $arrayElemAt:['$username',0]},
            bio: {
          $arrayElemAt:['$bio',0]},
            location: {
          $arrayElemAt:['$location',0]},
            image: {
          $arrayElemAt:['$image',0]},
            _id:'$memberId'
          }},{
          $project: {
            members:0,
            memberId:0
          }},{
                $skip:(page-1)*10
                 },{
                    $limit:10
            
          }]

        const admins=await CommunityMember.aggregate(aggregation)
        for (let user of admins) {
            
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
            message:"Community admins fetched successfully",
            admins
        })
        
    } catch (error) {
        return res.status(400).json({
            msg: 'Error in getting community admins',
            error: error.message,
        });
    }
}
const joinOrLeaveCommunity = async (req, res) => {
    try {
        const {communityId}=req.params
        const userId=req.user._id
        
        const community=await Community.findById(communityId)
        if(!community){
            return res.status(400).json({
                msg:"Community doesnot exist"
            })
        }
        const check=await CommunityMember.findOne({
            communityId,
            memberId:userId
        })
        if(check){
            await CommunityMember.findByIdAndDelete(check._id)
           const notify= await Notification.create({
                userId:community.owner,
                notificationType:"community",
                message:`${req.user.username} left ${community.name} community`
            })
            emitSocketEvent(req,community.owner.toString(),'NOTIFICATION_EVENT',notify)
            return res.status(200).json({
                message:"Left community successfully"
            })
        }
        await CommunityMember.create({
            communityId,
            memberId:userId
        })
        const notify=await Notification.create({
            userId:community.owner,
            notificationType:"community",
            message:`${req.user.username} joined ${community.name} community`
        })
        emitSocketEvent(req,community.owner.toString(),'NOTIFICATION_EVENT',notify)

        return res.status(200).json({
            message:"Joined community successfully"
        })
        
    } catch (error) {
        return res.status(400).json({
            msg: 'Error in joining or leaving community',
            error: error.message,
        });
    }
}
const getAllMembersOfCommunity=async(req,res)=>{
    try {
        const {communityId}=req.params
        const page=parseInt(req.query.page) || 1
        const aggregation=[{
            $match: {
              communityId:new  mongoose.Types.ObjectId(communityId)
            }
          },{
          $project: {
            memberId:1,role:1,_id:0
          }
          },{
            $lookup: {
              from: 'users',
              localField: 'memberId',
              foreignField: '_id',
              as: 'members'
            }
          },{
          $addFields: {
            username:'$members.username',
            bio:'$members.bio',
            image:'$members.image',
            location:'$members.location'
          }},{
          $addFields: {
            username: {
          $arrayElemAt:['$username',0]},
            bio: {
          $arrayElemAt:['$bio',0]},
            location: {
          $arrayElemAt:['$location',0]},
            image: {
          $arrayElemAt:['$image',0]},
            _id:'$memberId'
          }},{
          $project: {
            members:0,
            memberId:0
          }},{
           $skip:(page-1)*10
          },{
            $limit:10
          }]

          const members=await CommunityMember.aggregate(aggregation)

          for (let user of members) {
            
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
                message:"All members of community fetched successfully",
                members
            })

            

        
    } catch (error) {
        return res.status(400).json({
            msg: 'Error in getting all members of community',
            error: error.message,
        });
    }
}
const getCommunity = async (req, res) => {
    try {
        const {communityId}=req.params

        const community=await Community.findById(communityId).select("-__v")
        return res.status(200).json({
            message:"Community fetched successfully",
            community
        })
        
    } catch (error) {
        return res.status(400).json({
            msg: 'Error in getting community',
            error: error.message,
        });
    }
}
const myCommunities=async(req,res)=>{
    try {
        
        const communities=await CommunityMember.find({
            memberId:req.user._id
        })

        const communityIdArray=communities.map((community)=>community.communityId)
        const community=await Community.find({
            _id:{$in:communityIdArray}
        }).select("-__v")
        
        return res.status(200).json({
            message:"My communities fetched successfully",
            community
        })
        
    } catch (error) {
        return res.status(400).json({
            msg: 'Error in getting my communities',
            error: error.message,
        });
    }
}

const getCommunityPost=async(req,res)=>{
    try {
        const {communityId}=req.params
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
                },
                profile:{$arrayElemAt:["$profile",0]}
              }
            }, {
              '$project': {
                'author': 0, 
                '__v': 0, 
                'updatedAt': 0, 
                'likes': 0, 
                'comment': 0
              }
            },{
                $sort:{
                    createdAt:-1
                }
            
            }]
        const posts=await SocialPost.aggregate([{
            $match:{
                communityId:new mongoose.Types.ObjectId(communityId)
            }
        },
            ...aggregation,
        ])
       
        return res.status(200).json({
            message:"Community posts fetched successfully",
            posts
        })   
    } catch (error) {
        return res.status(400).json({
            msg: 'Error in getting community Post',
            error: error.message,
        })   
    }
}

const getCommunityPolls=async(req,res)=>{
    try {
        const {communityId}=req.params
        const aggregation=[
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
                $sort:{
                    createdAt:-1
                }
          }
          ] 

        const polls=await Poll.aggregate([{
            $match:{
                communityId:new mongoose.Types.ObjectId(communityId)
            }
        
        },...aggregation])

        return res.status(200).json({
            message:"Community polls fetched successfully",
            polls
        })
        
    } catch (error) {
        return res.status(400).json({
            msg: 'Error in getting community polls',
            error: error.message,
        })
    }
}

const searchCommunity=async(req,res)=>{
    try {
        const {search}=req.body
        const communities=await Community.find({
            name:{$regex:search,$options:'i'}
        }).select("name image category description")
        return res.status(200).json({
            message:"Community searched successfully",
            communities
        })
        
    } catch (error) {
        return res.status(400).json({
            msg: 'Error in searching community',
            error: error.message,
        })
    }
}
module.exports = { 
    createCommunity,
    updateCommunity, 
    deleteCommunity,
    getCommunity,
    addorRemoveMember,
    addorRemoveAdmin,
    getCommunityMembers,
    getCommunityAdmins,
    joinOrLeaveCommunity,
    getAllMembersOfCommunity,
    myCommunities,
    getCommunityPost,
    getCommunityPolls,
    searchCommunity
};









   