const express = require('express');
const router = express.Router();

const authController = require('../../controller/patient/auth');

router.post('/signup', authController.signup);

module.exports = router;
