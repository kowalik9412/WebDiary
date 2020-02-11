const express = require('express');
const authController = require('../controllers/auth');

const router = express.Router();

// GET Login Page
router.get('/login', authController.getLoginPage);

// GET Register Page
router.get('/register', authController.getRegisterPage);

module.exports = router;
