const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const { findnearbyPeople}= require('../controllers/map');

router.get("/findnearbyPeople", auth, findnearbyPeople)

module.exports=router