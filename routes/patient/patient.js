const express = require('express');
const router = express.Router();
const patientController = require('../../controller/patient/patient');
const isAuthD = require('../../middleware/isAuthD');

router.get('', isAuthD, patientController.getAll);

router.get('/:id', isAuthD, patientController.getById);

module.exports = router;
