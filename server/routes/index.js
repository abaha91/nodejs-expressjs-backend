const express = require('express');
const router  = express.Router();

const indexController = require('../controllers/index');
const loginController = require('../controllers/login');
const adminController = require('../controllers/admin');

router.get('/', indexController.get);
router.post('/', indexController.post);

router.get('/login', loginController.get);
router.post('/login', loginController.post);

router.get('/admin', adminController.get);
router.post('/admin/upload', adminController.saveProduct);
router.post('/admin/skills', adminController.saveSkills);

module.exports = router;

