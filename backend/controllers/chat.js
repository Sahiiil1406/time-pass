const Message = require('../models/message');
const Chat = require('../models/chat');
const User = require('../models/user');
const mongoose = require('mongoose');
const {getDistance} = require('geolib');
const { emitSocketEvent } = require('../sockets/socket');


const addNewParticipantInGroupChat = async (req, res) => {
  try {
    const {chatId}=req.params;
    const {participantId}=req.body;
    const chat = await Chat.findById(chatId);
    if(!chat){
      return res.status(404).json({msg:'Chat not found'});
    }
    if(chat.admin.toString()!==req.user._id.toString()){
      return res.status(401).json({msg:'You are not authorized to add participants to this chat'});
    }
    if(chat.participants.includes(participantId)){
      return res.status(400).json({
        msg:"Already present in this group"
      })
    }
    const updatedChat = await Chat.findByIdAndUpdate(chatId, {
      $push: { participants: participantId }
    }, { new: true });
    if(!updatedChat){
      return res.status(500).json({msg:'Error adding new participant in group chat'});
    }

    emitSocketEvent(
      req,
      participantId.toString(),
      "NEW_CHAT_EVENT",
      `You have been added to a new chat!. ${chat.name} Click to view`
    );

    return res.status(200).json({
      msg:'Participant added successfully',
    });
    
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      msg: 'Error adding new participant in group chat'
    })
  }
}
const createAGroupChat = async (req, res) => {
  try {
    const {name,participants,imageforChat}=req.body;
    //console.log(participants)
    
    const chat = await Chat.create({
      name,
      participants:participants,
      groupChat:true,
      admin:req.user._id,
      imageforChat
    });
    if(!chat){
      return res.status(500).json({msg:'Error creating a group chat'});
    }
    const createdChat = await Chat.findById(chat._id);
    if(!createdChat){
      return res.status(500).json({msg:'Error creating a group chat'});
    }
    createdChat.participants.forEach(async (participant) => {
      
      if(participant!==req.user._id){
        console.log(participant)
        emitSocketEvent(
          req,
          participant.toString(),
          "NEW_CHAT_EVENT",
          createdChat)
      }
    });
    return res.status(201).json({
      msg:'Group chat created successfully',
      chat:createdChat,
    });

    
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      msg: 'Error creating a group chat'
    })
  }
}
const createOrGetAOneOnOneChat = async (req, res) => {
  try {
    const recieverId = req.body.recieverId;
    const reciever=await User.findById(recieverId);
    if(!reciever){
      return res.status(404).json({msg:'User not found'});
    }
    if(recieverId===req.user._id.toString()){
      return res.status(400).json({msg:'You cannot create a chat with yourself'});
    }
    //Add aggregation to get chat with both users
    const messageAggregation=[{
      $lookup: {
        from: 'users',
        localField: 'sender',
        foreignField: '_id',
        as: 'user',
        pipeline:[{
           $project:{
               username:1,
               image:1
           }
        }]
      }
    },{
      $addFields: {
        sender: { $first: "$user" },
      },
    },{
    $project: {
      content:1,
      createdAt:1,
      updatedAt:1,
      sender:1,
      attachment:1
    }
    }]
    const chat = await Chat.aggregate([
      {
        $match:{
             participants: 
                    { $elemMatch: { $eq: new mongoose.Types.ObjectId(recieverId)} },   
                    groupChat:false 
        }},{
          $match:{
            participants:
            { $elemMatch: { $eq:req.user._id } }  
          }
        }
    ]);
    
    if(chat.length>0){
      //console.log(chat[0]._id)
      const messages= await Message.aggregate([
        {
          $match:{
            chat:chat[0]._id
          }
        },...messageAggregation,{
          $sort: { createdAt: 1 }
        }
      ])
      return res.status(200).json({
        msg:"chat retrieved successfully",
        messages,
      });
    }

    const newChat = await Chat.create({
      name:"One on one chat",
      participants: [req.user._id, recieverId]
    });
    //add aggregation to get chat with both users
    const createdChat = await Chat.findById(newChat._id)
    const payload=createdChat[0];
    if(!createdChat){
      return res.status(500).json({msg:'Error creating chat'});
    }

    emitSocketEvent(
      req,
      recieverId.toString(),
      "NEW_CHAT_EVENT",
      "You have a new chat with " + req.user.username + "! Click to view"
    );

    return res.status(201).json({
      msg:"chat created successfully",
      chat:newChat,
    });

  } catch (error) {
    return res.status(500).json({ 
      error: error.message,
    msg: 'Error creating or getting one on one chat'});
  }
}
const deleteGroupChat = async (req, res) => {
  try {
    const {chatId}=req.params;
    //add aggregation
    const chat = await Chat.findById(chatId);
    if(!chat){
      return res.status(404).json({msg:'Chat not found'});
    }
    if(chat.admin.toString()!==req.user._id.toString()){
      return res.status(401).json({msg:'You are not authorized to delete this chat'});
    }
    const deletedChat=await Chat.findByIdAndDelete(chatId);
    if(!deletedChat){
      return res.status(500).json({msg:'Error deleting chat'});
    }
    const participants=deletedChat.participants;
    participants.forEach(async (participant) => {
     if(participant!==req.user._id){
       emitSocketEvent(
         req,
         participant.toString(),
          "CHAT_DELETED_EVENT",
          chat
       )
     }
    });
    return res.status(200).json({
      msg:"Chat deleted successfully",
    });
    
  } catch (error) {
    return res.status(400).json({
      msg:"Error in deleting chat",
      error
    })
  }
}
const deleteOneOnOneChat = async (req, res) => {
  try {
    const {chatId}=req.params;
    const chat = await Chat.findById(chatId);
    if(!chat){
      return res.status(404).json({msg:'Chat not found'});
    }
    if(chat.groupChat){
      return res.status(400).json({msg:'This is not a one on one chat'});
    }
    const deletedChat=await Chat.findByIdAndDelete(chatId);
    if(!deletedChat){
      return res.status(500).json({msg:'Error deleting chat'});
    }
    const participants=deletedChat.participants;
    participants.forEach(async (participant) => {
     if(participant!==req.user._id){
       emitSocketEvent(
         req,
         participant.toString(),
         "CHAT_DELETED_EVENT",
         `Chat with ${req.user.username} deleted`
       )
     }
    });
    return res.status(200).json({
      msg:"Chat deleted successfully",
    });

    
  } catch (error) {
    return res.status(400).json({
      msg:"Error in deleting chat",
      error
    })
  }
}
const getGroupChatDetails = async (req, res) => {
  try {
    const {chatId}=req.params;
   const aggregation=[{
      $match:{
        _id:new mongoose.Types.ObjectId(chatId)
      }
   },
    {
      $lookup: {
        from: 'users',
        localField: 'participants',
        foreignField: '_id',
        as: 'participants',
        pipeline:[{
          $project:{
           username:1,
           image:1
          }
        }]
      }
    },{
    $project: {
      createdAt:0,
      updatedAt:0,
      __v:0,
      lastMessage:0
    }
    }]
    
   const details=await Chat.aggregate(aggregation);
    if(!details){
      return res.status(404).json({msg:'No chats found'});
    }
    const payload=details[0];
    return res.status(200).json({
      msg:"Chats retrieved successfully",
      payload
    });
    
  } catch (error) {
    return res.status(400).json({
      msg:"Error in getting all chats",
      error
    })
  }
}
const getAllChats = async (req, res) => {
  try {
   
    const aggregation=[{
      $match:{
                  participants: 
                  { $elemMatch: { $eq: req.user._id} },
                }
      },
      {$lookup: {
        from: 'messages',
        localField: 'lastMessage',
        foreignField: '_id',
        as:'lastMessage',
        pipeline:[
          {
            $project:{
              content:1,
              attatchment:1
            }
          }
        ]
      }},
       {
      $addFields: {
          lastMessage:{
             $first:'$lastMessage'
          }
      }
       },
       {
         $project: {
           admin:0,
           __v:0
         }
       }]
    const chats = await Chat.aggregate(aggregation);
    //console.log(chats)
    if(!chats){
      return res.status(404).json({msg:'No chats found'});
    }
  
    //update one-to one chat
   for(let i=0;i<chats.length;i++){
    if(!chats[i].groupChat){
      const recieverId=chats[i].participants.filter(participant=>participant!==req.user._id);
      const reciever=await User.findById(recieverId);
      if(!reciever){
        return res.status(404).json({msg:'User not found'});
      }
      chats[i].name=reciever.username;
      chats[i].imageforChat=reciever.image
    }
   }

    return res.status(200).json({
      msg:"Chats list retrieved successfully",
      chats
    });
    
  } catch (error) {
    return res.status(400).json({
      msg:"Error in getting all chats",
      error
    })
  }
}
const leaveGroupChat = async (req, res) => {
  try {
    const {chatId}=req.params;
    const chat = await Chat.findById(chatId);
    if(!chat){
      return res.status(404).json({msg:'Chat not found'});
    }
    if(chat.admin.toString()===req.user._id.toString()){
      return res.status(401).json({msg:'You cannot leave a chat you created'});
    }
    const updatedChat = await Chat.findByIdAndUpdate(chatId, {
      $pull: { participants: req.user._id }
    }, { new: true });

    if(!updatedChat){
      return res.status(500).json({msg:'Error leaving group chat'});
    }
    emitSocketEvent(
      req,
      chat.admin.toString(),
      "CHAT_DELETED_EVENT",
      `Participant ${req.user.username} has left the chat`
    );
    return res.status(200).json({
      msg:'Left group chat successfully',
    });
    
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      msg: 'Error leaving group chat'
    })
  }
}
const removeParticipantFromGroupChat = async (req, res) => {
  try {
    const {participantId}=req.body;
    const {chatId}=req.params;

    const chat = await Chat.findById(chatId);
    if(!chat){
      return res.status(404).json({msg:'Chat not found'});
    }
    if(chat.admin.toString()!==req.user._id.toString()){
      return res.status(401).json({msg:'You are not authorized to remove participants from this chat'});
    }
    const updatedChat = await Chat.findByIdAndUpdate(chatId, {
      $pull: { participants: participantId }
    }, { new: true });
    if(!updatedChat){
      return res.status(500).json({msg:'Error removing participant from group chat'});
    }
    emitSocketEvent(
      req,
      participantId.toString(),
      "CHAT_DELETED_EVENT",
      `You have been removed from ${chat.name} chat`
    );
    return res.status(200).json({
      msg:'Participant removed successfully',
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      msg: 'Error removing participant from group chat'
    })
  }
}
const renameGroupChat = async (req, res) => {
  try {
    const {chatId}=req.params;
    const {name}=req.body;

    const chat = await Chat.findById(chatId);
    const oldName=chat.name;
    if(!chat){
      return res.status(404).json({msg:'Chat not found'});
    }
    if(chat.admin.toString()!==req.user._id.toString()){
      return res.status(401).json({msg:'You are not authorized to rename this chat'});
    }
    const updatedChat = await Chat.findByIdAndUpdate(chatId, {
      name
    }, { new: true });
    
    if(!updatedChat){
      return res.status(500).json({msg:'Error renaming group chat'});
    }
    const participants=updatedChat.participants;
    participants.forEach(async (participant) => {
      if(participant!==req.user._id){
        emitSocketEvent(
          req,
          participant.toString(),
          "CHAT_RENAMED_EVENT",
          `Chat name has been changed from ${oldName} to ${name}`
        )
      }
    });
    return res.status(200).json({
      msg:'Chat renamed successfully',
    });
    
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      msg: 'Error renaming group chat'
    })
  }
}
const searchAvailableUsers = async (req, res) => {
  try {
    const {search}=req.body;
    const page = parseInt(req.query.page) || 1;
    const users = await User.find({
      username: { $regex: search, $options: 'i' }
    }).select('username image bio location').skip(10*(page-1)).limit(10)
    if(!users){
      return res.status(404).json({msg:'No users found'});
    }
    const updatedUsers = users.map(user => user.toObject());
    for (let user of updatedUsers) {
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
      msg:'Users retrieved successfully',
      updatedUsers
    });
    
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      msg: 'Error searching for available users'
    })
  }
}


module.exports={
  addNewParticipantInGroupChat,
  createAGroupChat,
  createOrGetAOneOnOneChat,
  deleteGroupChat,
  deleteOneOnOneChat,
  getAllChats,
  getGroupChatDetails,
  leaveGroupChat,
  removeParticipantFromGroupChat,
  renameGroupChat,
  searchAvailableUsers,
}