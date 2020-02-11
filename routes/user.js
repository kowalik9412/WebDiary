const express = require('express');
const userController = require('../controllers/user');

const router = express.Router();

// GET Main Page
router.get('/home', userController.getMainPage);

module.exports = router;
