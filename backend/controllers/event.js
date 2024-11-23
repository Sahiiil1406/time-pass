const Event= require('../models/events');
const User = require('../models/user');
const EventMember = require('../models/eventMember');
const Notification = require('../models/notification');
const {emitSocketEvent}=require('../sockets/socket');
const mongoose=require('mongoose') 
const {getDistance}=require('geolib')

const createEvent = async (req, res) => {
    try {
        const {title,
            description,
            startTime,
            startDate,
            endDate,
            mode,
            location,
            category,
            images
             }=req.body
        if(!title || !startTime || !mode || !category){
            return res.status(400).json({
                msg:"Please provide all required fields"
            })
        }     
        
        const newEvent=await Event.create({
            title,
            description,
            startTime,
            startDate,
            endDate,
            mode,
            location,
            category,
            images,
            organizer:req.user._id
        })
        const eventMember=await EventMember.create({
            eventId:newEvent._id,
            memberId:req.user._id
        })

        return res.status(201).json({
            msg:"Event created successfully",
            newEvent
        })

        
    } catch (error) {
        return res.status(400).json({
            msg:"Error in creating events",
            error
        })
    }
}
const getEventsById = async (req, res) => {
    try {
        const eventId=req.params.id
        const event=await Event.findById(eventId).populate('organizer','name coverImage').select('-updatedAt -createdAt -__v')
        if(!event){
            return res.status(400).json({
                msg:"Event not found"
            })
        }
        const eventMembers=await EventMember.find({
            eventId:eventId,
            memberId:req.user._id
        })
        if(eventMembers.length>0){
            event.isJoined=true
        }else{
            event.isJoined=false
        }
        return res.status(200).json({
            msg:"Event found successfully",
            event
        })
        
    } catch (error) {
        return res.status(400).json({
            msg:"Error in getting event by id",
            error
        })
    }
}
const updateEventById= async (req, res) => {
    try {
        const eventId=req.params.id
        const {title,
            description,
            startTime,
            startDate,
            endDate,
            mode,
            location,
            category,
            images
             }=req.body

        const event=await Event.findById(eventId)
        if(!event){
            return res.status(400).json({
                msg:"Event not found"
            })
        }
        if(event.organizer.toString()!==req.user._id.toString()){
            return res.status(400).json({
                msg:"You are not authorized to update this event"
            })
        }
        event.title=title
        event.description=description
        event.startTime=startTime
        event.startDate=startDate
        event.endDate=endDate
        event.mode=mode
        event.location=location
        event.category=category
        event.images=images
        await event.save()
        return res.status(200).json({
            msg:"Event updated successfully",
            event
        })     
        
    } catch (error) {
        return res.status(400).json({
            msg:"Error in updating event by id",
            error
        })
    }
}
const deleteEventById = async (req, res) => {
    try {
        const eventId=req.params.id
        const event=await Event.findById(eventId)
        if(!event){
            return res.status(400).json({
                msg:"Event not found"
            })
        }
        if(event.organizer.toString()!==req.user._id.toString()){
            return res.status(400).json({
                msg:"You are not authorized to delete this event"
            })
        }
        await Event.findByIdAndDelete(eventId)
        await EventMember.deleteMany({eventId:eventId})
        return res.status(200).json({
            msg:"Event deleted successfully",
            event
        })
        
    } catch (error) {
        return res.status(400).json({
            msg:"Error in deleting event by id",
            error
        })
    }
}
const getAllEvents = async (req, res) => {
    try {
        const events=await Event.find().select('-updatedAt -createdAt -__v -location ')
        
        return res.status(200).json({
            msg:"All events found successfully",
            events
        })
        
    } catch (error) {
        return res.status(400).json({
            msg:"Error in getting all events",
            error
        })
    }
}
const upComingEvents = async (req, res) => {
    try {
        const events=await Event.find({startDate:{$gte:new Date()}}).select('-updatedAt -createdAt -__v -location ')
        
        return res.status(200).json({
            msg:"Upcoming events found successfully",
            events
        })
        
    } catch (error) {
        return res.status(400).json({
            msg:"Error in getting upcoming events",
            error
        })
    }
}
const pastEvents = async (req, res) => {
    try {
        const events=await Event.find({
            endDate:{
                $lte:new Date()
            }
        }).select('-updatedAt -createdAt -__v -location ')
        
        return res.status(200).json({
            msg:"Past events found successfully",
            events
        })
        
    } catch (error) {
        return res.status(400).json({
            msg:"Error in getting past events",
            error
        })
    }
}
const onGoingEvents=async(req,res)=>{
    try {
        const events=await Event.find({
            startDate:{
                $lte:new Date()
            },
            endDate:{
                $gte:new Date()
            }
        })

        return res.status(200).json({
            msg:"Fetched onGoing events successfully",
            events
        })
    } catch (error) {
        return res.status(400).json({
            msg:"Error in getting nGoing Events"
        })
    }
}
const filterEvents=async(req,res)=>{
    try {
        const {mode,category}=req.query

        const events=await Event.find({
            mode:mode,
            $or:[{
            mode:mode},
            {category:category}]

        }).select('-updatedAt -createdAt -__v -location ')
        if(!events){
            return res.status(400).json({
                msg:"No events found"
            })
        }
        return res.status(200).json({
            msg:"Events filtered successfully",
            events
        })
        
    } catch (error) {
        return res.status(400).json({
            msg:"Error in filtering events"
        })
    }
}
const joinOrLeaveEvent=async(req,res)=>{
    try {
        const eventId=req.params.id
        const event=await Event.findById(eventId)
        if(!event){
            return res.status(400).json({
                msg:"Event not found"
            })
        }
        const eventMember=await EventMember.findOne({
            eventId:eventId,
            memberId:req.user._id
        })
        if(eventMember){
            await EventMember.findByIdAndDelete(eventMember._id)
            await Notification.findOneAndDelete({
                userId:event.organizer,
                notificationType:'event',
                message:`${req.user.username} have leave the event ${event.title}`
            })
            return res.status(200).json({
                msg:"You have left the event"
            })
        }
        await EventMember.create({
            eventId:eventId,
            memberId:req.user._id
        })
        const notify=await Notification.create({
            userId:event.organizer,
            notificationType:'event',
            message:`${req.user.username} have joined the event ${event.title}`
        })
        emitSocketEvent(req,event.organizer.toString(),'NOTIFICATION_EVENT',notify)
        return res.status(200).json({
            msg:"You have joined the event"
        })
        
    } catch (error) {
        return res.status(400).json({
            msg:"Error in joining or leaving event"
        })
    }
}
const getEventMembers=async(req,res)=>{
    try {
        const eventId=req.params.id
        const page=parseInt(req.query.page)||1
        const eventMembersAggregation=[{
            $match: {
              eventId:new mongoose.Types.ObjectId(eventId)
            }},
             {
            $lookup: {
              from: 'users',
              localField: 'memberId',
              foreignField: '_id',
              as: 'member'
            }},
            {
              $addFields: {
                username: '$member.username',
                bio: '$member.bio',
                location: '$member.location',
                image: '$member.image'
              }
            },{
            $addFields: {
              username:{
               $arrayElemAt:['$username',0]
              },
              bio:{
               $arrayElemAt:['$bio',0]
              },
              location:{
               $arrayElemAt:['$location',0]
              },
              image:{
               $arrayElemAt:['$image',0]
              }
            }},{
            $project: {
              username:1,
              bio:1,
              image:1,
              location:1
            }
            },
        {
            $skip:(page-1)*10
        },{
            $limit:10
        }]
        const eventMembers=await EventMember.aggregate(eventMembersAggregation)
        
        
        for (let user of eventMembers) {
            
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
            msg:"Event members found successfully",
            eventMembers
        })
        
    } catch (error) {
        return res.status(400).json({
            msg:"Error in getting event members",
            error
        })
    }
}
const searchEvents=async(req,res)=>{
    try {
        const {search}=req.body
        const events=await Event.find({
            title:{
                $regex:search,
                $options:'i'
            }
        }).select('-updatedAt -createdAt -__v -location ')
        if(!events){
            return res.status(400).json({
                msg:"No events found"
            })
        }
        return res.status(200).json({
            msg:"Events found successfully",
            events
        })
        
    } catch (error) {
        return res.status(400).json({
            msg:"Error in searching events"
        })
    }
}
const myEvents=async(req,res)=>{
    try {
        const myEvents=await EventMember.find({
            memberId:req.user._id
        }).populate('eventId','title description startTime startDate endDate mode category images organizer').select('-updatedAt -createdAt -__v -location ')
        if(!myEvents){
            return res.status(400).json({
                msg:"No events found"
            })
        }
        return res.status(200).json({
            msg:"My events found successfully",
            myEvents
        })
        
    } catch (error) {
        return res.status(400).json({
            msg:"Error in getting my events",
            error
        })
    }
}

module.exports={
    createEvent,
    getEventsById,
    updateEventById,
    deleteEventById,
    getAllEvents,
    upComingEvents,
    pastEvents,
    onGoingEvents,
    filterEvents,
    joinOrLeaveEvent,
    getEventMembers,
    searchEvents,
    myEvents
}