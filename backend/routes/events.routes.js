const express=require('express')
const router=express.Router()
const auth=require('../middleware/auth')
const {
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
}=require('../controllers/event')

const {
    createEventValidator,
    getEventValidator,
    updateEventValidator,
    deleteEventValidator,
    filterEventsValidator,
    joinOrLeaveEventValidator,
    getEventMembersValidator,
    searchEventsValidator
}=require('../validators/events.validator.js')
const validate=require('../validators/main')

router.post('/create',createEventValidator(),validate,auth,createEvent)
router.put('/update/:id',updateEventValidator(),validate,auth,updateEventById)
router.delete('/delete/:id',deleteEventValidator(),validate,auth,deleteEventById)
router.get('/get/:id',getEventValidator(),validate,auth,getEventsById)
router.get('/getAllEvents',auth,getAllEvents)
router.post('/searchEvents',searchEventsValidator(),validate,auth,searchEvents)
router.get('/myEvents',auth,myEvents)


router.get('/upComingEvents',auth,upComingEvents)
router.get('/pastEvents',auth,pastEvents)
router.get('/onGoingEvents',auth,onGoingEvents)
router.get('/filteredEvents',filterEventsValidator(),validate,auth,filterEvents)
router.post('/joinLeaveEvent/:id',auth,joinOrLeaveEventValidator(),validate,joinOrLeaveEvent)
router.get('/getEventMembers/:id',getEventMembersValidator(),validate, auth,getEventMembers)

module.exports=router
