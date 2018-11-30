const express = require('express');
const router  = express.Router();

const indexController = require('../controllers/index');
const loginController = require('../controllers/login');
const adminController = require('../controllers/admin');

router.get('/', indexController.renderPage);
router.get('/login', loginController.renderPage);
router.get('/admin', adminController.renderPage);

module.exports = router;

