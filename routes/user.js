const express = require('express');
const userController = require('../controllers/user');
const { check } = require('express-validator');

const authentication = require('../util/isAuth');

const router = express.Router();

// GET Main Page
router.get('/home', authentication, userController.getMainPage);

// POST Add Record
router.post('/add', authentication, userController.postAddRecord);

// GET Edit Record
router.get('/edit/:id', authentication, userController.getEditRecord);

// POST Edit Record
router.post('/edit/:id', authentication, userController.postEditRecord);

// POST Delete Record
router.post('/delete/:id', authentication, userController.postDeleteRecord);

// POST Fuzzy Search
router.post('/search', authentication, userController.postFuzzySearch);

// POST Date Search
router.post('/search-date', authentication, userController.postDateSearch);

module.exports = router;
