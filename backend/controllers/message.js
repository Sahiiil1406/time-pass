const Chat = require('../models/chat');
const Message = require('../models/message');
const mongoose = require('mongoose');
const {emitSocketEvent} = require('../sockets/socket');

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

const getAllMessages = async (req, res) => {
    try {
        const chatId = req.params.chatId;
        const chat = await Chat.findById(chatId);

        if (!chat) {
            return res.status(404).json({ 
                message: "Chat not found" });
        }
        if(!chat.participants.includes(req.user._id)){
            return res.status(403).json({ 
                message: "You are not authorized to view this chat" });
        }
        const messages= await Message.aggregate([{
            $match: {
                chat:new mongoose.Types.ObjectId(chatId)
            }
        },...messageAggregation,{
            $sort: { createdAt: 1 }}])

        return res.status(200).json({
            msg: "Messages retrieved successfully",
            messages: messages
        });
        
    } catch (error) {
        return res.status(500).json({ message: error.message,
            msg: "Error getting all messages"
         });
    }
}

const sendMessage = async (req, res) => {
    try {
        const {chatId}=req.params
        const {content,attachment}=req.body
        if(!content && !attachment){
            return res.status(400).json({ 
                message: "Please provide content or attachment" });
        }
        const chat = await Chat.findById(chatId);
        if(!chat){
            return res.status(404).json({ 
                message: "Chat not found" });
        }
        if(!chat.participants.includes(req.user._id)){
            return res.status(403).json({ 
                message: "You are not authorized to send message in this chat" });
        }
        
        const message = await  Message.create({
            content,
            attachment,
            sender: req.user._id,
            chat: chatId
        });
        const updatedChat = await Chat.findByIdAndUpdate(chatId, {
            lastMessage: message._id
        }, {new: true});
        
        
        const messageforSocket=await Message.aggregate([{
            $match:{
                _id:new mongoose.Types.ObjectId(message._id)
            },
            }
            ,...messageAggregation])
            //console.log(messageforSocket[0])
       const chatforSocket=messageforSocket[0]

        chat.participants.forEach(participant=>{
            if(participant.toString()!==req.user._id.toString()){
                emitSocketEvent(req,
                    participant.toString(),
                   'MESSAGE_RECEIVED_EVENT',
                   chatforSocket
                    )

            }
        })

        return res.status(200).json({
            msg: "Message sent successfully",
            message: message
        });


    } catch (error) {
        return res.status(500).json({ message: error.message,
            msg: "Error sending message"
         });
    }
}
const updateMessage = async (req, res) => {
    try {
        const {messageId,content}=req.body
        const message = await Message.findById(messageId);
        if(!message){
            return res.status(404).json({ 
                message: "Message not found" });
        }
        if(message.sender.toString()!==req.user._id.toString()){
            return res.status(403).json({ 
                message: "You are not authorized to update this message" });
        }
        message.content=content
        await message.save()

        return res.status(200).json({
            msg: "Message updated successfully",
            message: message
        });

       
    } catch (error) {
        return res.status(500).json({ message: error.message,
            msg: "Error updating message"
         });
        
    }
}

const deleteMessage=async(req,res)=>{
    try {
        const {messageId}=req.body
        const message = await Message.findById(messageId);  
        if(!message){
            return res.status(404).json({ 
                message: "Message not found" });
        }
        if(message.sender.toString()!==req.user._id.toString()){
            return res.status(403).json({ 
                message: "You are not authorized to delete this message" });
        }
        await Message.findByIdAndDelete(messageId)
        return res.status(200).json({
            msg: "Message deleted successfully",
        });
    }
    catch (error) {
        return res.status(500).json({ message: error.message,
            msg: "Error deleting message"
         });
    }
}

module.exports = {
    getAllMessages,
    sendMessage,
    updateMessage,
    deleteMessage
}