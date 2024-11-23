const {body,param}=require('express-validator')


const createEventValidator=()=>{
    return [
        body('title')
        .notEmpty()
        .withMessage("Title is required")
        .isString(),

        body('description')
        .isString()
        .withMessage("Description should be string"),

        body('location')
        .isString(),

        body('category')
        .notEmpty()
        .withMessage("Category is required")
        .isString(),

        body('mode')
        .notEmpty()
        .withMessage("Mode is required")
        .isString(),

        body('startDate')
        .notEmpty()
        .withMessage("Start Date is required")
        .isDate(),

        body('endDate')
        .notEmpty()
        .withMessage("End Date is required")
        .isDate(),

        body('startTime')
        .notEmpty()
        .withMessage("Start Time is required")
        .isString(),


    ]
}

const getEventValidator=()=>{
    return [
        param('id')
        .notEmpty()
        .withMessage("Event Id is required")
        .isMongoId()
    ]
}

const updateEventValidator=()=>{
    return [
        param('id')
        .notEmpty()
        .withMessage("Event Id is required")
        .isMongoId(),

        body('title')
        .isString(),

        body('description')
        .isString(),

        body('location')
        .isString(),

        body('category')
        .isString(),

        body('mode')
        .isString(),

        body('startDate')
        .isDate(),

        body('endDate')
        .isDate(),

        body('startTime')
        .isString(),
    ]
}

const deleteEventValidator=()=>{
    return [
        param('id')
        .notEmpty()
        .withMessage("Event Id is required")
        .isMongoId()
    ]
}

const filterEventsValidator=()=>{
    return [
        body('category')
        .isString(),

        body('mode')
        .isString(),
    ]
}

const joinOrLeaveEventValidator=()=>{
    return [
        param('id')
        .notEmpty()
        .withMessage("Event Id is required")
        .isMongoId()
    ]
}

const getEventMembersValidator=()=>{
    return [
        param('id')
        .notEmpty()
        .withMessage("Event Id is required")
        .isMongoId()
    ]
}

const searchEventsValidator=()=>{
    return [
        body('search')
        .isString()
    ]
}

module.exports={
    createEventValidator,
    getEventValidator,
    updateEventValidator,
    deleteEventValidator,
    filterEventsValidator,
    joinOrLeaveEventValidator,
    getEventMembersValidator,
    searchEventsValidator
}