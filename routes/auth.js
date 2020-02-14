const express = require('express');
const authController = require('../controllers/auth');

const router = express.Router();

// GET Login Page
router.get('/login', authController.getLoginPage);

// POST Login
router.post('/login', authController.postLogin);

// GET Register Page
router.get('/register', authController.getRegisterPage);

// POST Register
router.post('/register', authController.postRegister);

module.exports = router;
