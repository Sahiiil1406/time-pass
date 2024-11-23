
const express = require('express');
const router = express.Router();
const {addNewParticipantInGroupChat,
    createAGroupChat,
    createOrGetAOneOnOneChat,
    deleteGroupChat,
    deleteOneOnOneChat,
    getAllChats,
    getGroupChatDetails,
    leaveGroupChat,
    removeParticipantFromGroupChat,
    renameGroupChat,
    searchAvailableUsers}=require('../controllers/chat');
const auth=require('../middleware/auth');   
const {createAGroupChatValidator,
    addNewParticipantInGroupChatValidator,
    createOrGetAOneOnOneChatValidator,
    deleteGroupChatValidator,
    deleteOneOnOneChatValidator,
    getGroupChatDetailsValidator,
    leaveGroupChatValidator,
    removeParticipantFromGroupChatValidator,
    renameGroupChatValidator,
    searchAvailableUsersValidator}=require('../validators/chat.validator');
const validate=require('../validators/main'); 

router.get('/all',auth,getAllChats);
router.post('/group',auth,createAGroupChatValidator(),validate,createAGroupChat);
router.post('/one-on-one',createOrGetAOneOnOneChatValidator(),validate,auth,createOrGetAOneOnOneChat);
router.get('/group/:chatId',getGroupChatDetailsValidator(),validate,auth,getGroupChatDetails);
router.put('/group/:chatId',auth,renameGroupChatValidator(),validate,renameGroupChat);
router.delete('/group/:chatId',deleteGroupChatValidator(),validate,auth,deleteGroupChat);
router.put('/group/:chatId/add-participant',addNewParticipantInGroupChatValidator(),validate,auth,addNewParticipantInGroupChat);
router.put('/group/:chatId/remove-participant',removeParticipantFromGroupChatValidator(),validate,auth,removeParticipantFromGroupChat);
router.delete('/group/:chatId/leave',leaveGroupChatValidator(),validate,auth,leaveGroupChat);
router.get('/search-users',searchAvailableUsersValidator(),validate,auth,searchAvailableUsers);
router.delete('/one-on-one/:chatId',deleteOneOnOneChatValidator(),validate,auth,deleteOneOnOneChat);

module.exports = router;