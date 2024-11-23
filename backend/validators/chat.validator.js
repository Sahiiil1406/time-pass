const {body, param} = require('express-validator');

const createAGroupChatValidator = () => {
    return [
        body('name')
        .isString()
        .withMessage('Name must be a string')
        .notEmpty()
        .withMessage('Name is required'),

        body('participants')
        .isArray()
        .withMessage('Participants must be an array')
        .notEmpty()
        .withMessage('Participants are required')
    ]
}

const createOrGetAOneOnOneChatValidator = () => {
    return [
        body('recieverId')
        .notEmpty()
        .withMessage('Participant is required')
        .isMongoId()
        .withMessage('Participant must be a valid MongoDB Id')
    ]
}

const deleteGroupChatValidator = () => {
    return [
        param('chatId')
        .notEmpty()
        .withMessage('ChatId must be a valid MongoDB Id')
        .isMongoId()
    ]
}

const deleteOneOnOneChatValidator = () => {
    return [
        param('chatId')
        .notEmpty()
        .withMessage('ChatId must be a valid MongoDB Id')
        .isMongoId()
    ]
}

const getGroupChatDetailsValidator = () => {
    return [
        param('chatId')
        .notEmpty()
        .withMessage('ChatId must be a valid MongoDB Id')
        .isMongoId()
    ]
}

const leaveGroupChatValidator = () => {
    return [
        param('chatId')
        .notEmpty()
        .withMessage('ChatId must be a valid MongoDB Id')
        .isMongoId()
    ]
}

const removeParticipantFromGroupChatValidator = () => {
    return [
        param('chatId')
        .notEmpty()
        .withMessage('ChatId must be a valid MongoDB Id')
        .isMongoId(),

        body('participantId')
        .notEmpty()
        .withMessage('ParticipantId must be a valid MongoDB Id')
        .isMongoId()
    ]
}

const renameGroupChatValidator = () => {
    return [
        param('chatId')
        .notEmpty()
        .withMessage('ChatId must be a valid MongoDB Id')
        .isMongoId(),

        body('name')
        .isString()
        .withMessage('Name must be a string')
        .notEmpty()
        .withMessage('Name is required')
    ]
}

const searchAvailableUsersValidator = () => {
    return [
        body('search')
        .isString()
        .withMessage('Search must be a string')
        .notEmpty()
        .withMessage('Search is required')
    ]
}
const addNewParticipantInGroupChatValidator = () => {
    return [
        param('chatId')
        .notEmpty()
        .withMessage('ChatId must be a valid MongoDB Id')
        .isMongoId(),

        body('participantId')
        .notEmpty()
        .withMessage('ParticipantId must be a valid MongoDB Id')
        .isMongoId()
    ]
}

module.exports = {
    addNewParticipantInGroupChatValidator,
    createAGroupChatValidator,
    createOrGetAOneOnOneChatValidator,
    deleteGroupChatValidator,
    deleteOneOnOneChatValidator,
    getGroupChatDetailsValidator,
    leaveGroupChatValidator,
    removeParticipantFromGroupChatValidator,
    renameGroupChatValidator,
    searchAvailableUsersValidator
}