const express = require('express');
const router = express.Router();
const patientController = require('../../controller/patient/patient');

router.get('', patientController.getAll);

router.get('/:id', patientController.getById);

module.exports = router;
