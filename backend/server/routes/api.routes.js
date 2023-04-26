const express = require('express');


const router = express.Router();




router.use('/post',require('../controllers/post.controller'));

module.exports = router;
