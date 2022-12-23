const express = require('express');
const router = express.Router();
const appoinmentController = require('../../controller/appoinment/appoinment');
const isAuthP = require('../../middleware/isAuthP');

router.post('/:id', isAuthP, appoinmentController.addAppmnt);

router.get('');

module.exports = router;
