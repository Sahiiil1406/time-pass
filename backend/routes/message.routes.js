const express = require('express');
const router = express.Router();

const {getAllMessages,
    sendMessage,
    updateMessage,
    deleteMessage
}=require('../controllers/message');
const {sendMessageValidator,
    updateMessageValidator,
    deleteMessageValidator,
    getAllMessagesValidator}=require('../validators/message.validator')
const validate=require('../validators/main')    
const auth=require('../middleware/auth');

router.get('/get/:chatId',getAllMessagesValidator(),validate,auth,getAllMessages);
router.post('/send/:chatId',sendMessageValidator(),validate,auth,sendMessage);
router.put('/update',updateMessageValidator(),validate, auth,updateMessage);
router.delete('/delete',deleteMessageValidator(),validate,auth,deleteMessage);

module.exports = router;
