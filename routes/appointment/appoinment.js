const express = require('express');
const router = express.Router();
const appoinmentController = require('../../controller/appoinment/appoinment');
const isAuthP = require('../../middleware/isAuthP');
const isAuthD = require('../../middleware/isAuthD');

router.post('/:id', isAuthP, appoinmentController.addAppmnt);

router.get('', isAuthD, appoinmentController.listAppmnt);

module.exports = router;
