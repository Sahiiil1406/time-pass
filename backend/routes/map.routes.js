const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { findnearbyPeopleValidator } = require('../validators/map.validator');
const validate = require('../validators/main');

const { findnearbyPeople}= require('../controllers/map');

router.get("/findnearbyPeople",findnearbyPeopleValidator(),validate, auth, findnearbyPeople)

module.exports=router