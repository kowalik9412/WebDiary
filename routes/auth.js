const express = require('express');
const authController = require('../controllers/auth');

const router = express.Router();

// GET Login Page
router.get('/login', authController.getLoginPage);

// POST Login
router.post('/login', authController.postLogin);

// POST Logout
router.get('/logout', authController.getLogout);

// GET Register Page
router.get('/register', authController.getRegisterPage);

// POST Register
router.post('/register', authController.postRegister);

// GET Reset Password Page
router.get('/reset', authController.getResetPage);

module.exports = router;
