const {param, body} = require('express-validator');

const sendMessageValidator = () => {
    return [
        body('content')
        .isString()
        .withMessage('Content must be a string'),

        param('chatId')
        .notEmpty()
        .withMessage('ChatId must be a valid MongoDB Id')
        .isMongoId()

    ]
}

const updateMessageValidator = () => {
    return [
        body('content')
        .isString()
        .withMessage('Content must be a string'),

        param('messageId')
        .notEmpty()
        .withMessage('MessageId must be a valid MongoDB Id')
        .isMongoId()
    ]
}

const deleteMessageValidator = () => {
    return [
        param('messageId')
        .notEmpty()
        .withMessage('MessageId must be a valid MongoDB Id')
        .isMongoId()
    ]
}

const getAllMessagesValidator = () => {
    return [
        param('chatId')
        .notEmpty()
        .withMessage('ChatId must be a valid MongoDB Id')
        .isMongoId()
    ]
}

module.exports = {
    sendMessageValidator,
    updateMessageValidator,
    deleteMessageValidator,
    getAllMessagesValidator
}