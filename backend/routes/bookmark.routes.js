const express = require('express');
const router = express.Router();
const bookmarkController = require('../controllers/bookmark');
const auth = require('../middleware/auth');
const {mongoIdPathVariableValidator} = require('../validators/common');
const validate = require('../validators/main');


router.post('/markAndUnmark/:postId',mongoIdPathVariableValidator('postId'),validate,auth, bookmarkController.markAndUnmark);
router.get('/get', auth, bookmarkController.getBookmarks);

module.exports = router;