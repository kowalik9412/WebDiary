const express = require('express');
const indexController = require('../controllers/index');

const authentication = require('../util/isAuth');

const router = express.Router();

router.get('/', authentication, indexController.getIndexPage);

module.exports = router;
