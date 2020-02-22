const express = require('express');
const userController = require('../controllers/user');

const authentication = require('../util/isAuth');

const router = express.Router();

// GET Main Page
router.get('/home', authentication, userController.getMainPage);

// POST Add Record
router.post('/add', authentication, userController.postAddRecord);

router.get('/getentries', userController.getEntries);

module.exports = router;
