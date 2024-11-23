const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const {createCommunity,
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
    searchCommunity} = require('../controllers/community');

const { createCommunityValidator,
    updateCommunityValidator,
    deleteCommunityValidator,
    getCommunityMembersValidator,
    getCommunityAdminsValidator,
    getCommunityValidator,
    getAllMembersOfCommunityValidator,
    addorRemoveAdminValidator,
    addorRemoveMemberValidator,
    joinOrLeaveCommunityValidator,
    searchCommunityValidator,
    getCommunityPostsValidator,
    getCommunityPollsValidator}=require('../validators/community.validator')
const validate=require('../validators/main')        
router.post('/create',createCommunityValidator(),validate, auth, createCommunity);
router.put('/update/:communityId', auth,updateCommunityValidator(),validate, updateCommunity);
router.delete('/delete/:communityId', auth,deleteCommunityValidator(),validate, deleteCommunity);
router.get('/get/:communityId',getCommunityValidator(),validate, auth,getCommunity);
router.post('/search',searchCommunityValidator(),validate, auth, searchCommunity);
router.get('/my', auth, myCommunities);

router.post('/addorRemoveMember/:communityId',addorRemoveMemberValidator(),validate, auth, addorRemoveMember);
router.post('/addorRemoveAdmin/:communityId', addorRemoveAdminValidator(),validate,auth, addorRemoveAdmin);
router.get('/getCommunityMembers/:communityId',getCommunityMembersValidator(),validate, auth, getCommunityMembers);
router.get('/getCommunityAdmins/:communityId',getCommunityAdminsValidator(),validate, auth, getCommunityAdmins);
router.get('/getAllMembersOfCommunity/:communityId',getAllMembersOfCommunityValidator(),validate, auth, getAllMembersOfCommunity);
router.post('/joinOrLeaveCommunity/:communityId',joinOrLeaveCommunityValidator(),validate, auth, joinOrLeaveCommunity);

router.get('/getCommunityPosts/:communityId',getCommunityPostsValidator(),validate, auth, getCommunityPost);
router.get('/getCommunityPolls/:communityId',getCommunityPollsValidator(),validate, auth, getCommunityPolls);



module.exports = router;