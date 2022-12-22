const express = require('express');
const router = express.Router();
const authController = require('../../controller/doctor/auth');

router.post('/signup', authController.signup);

router.post('/login');

module.exports = router;
