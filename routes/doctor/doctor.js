const express = require('express');
const router = express.Router();
const doctorController = require('../../controller/doctor/doctor');
const isAuthD = require('../../middleware/isAuthD');

router.get('', doctorController.getAll);

router.get('/:id', doctorController.getById);

router.post('/:patientId', isAuthD, doctorController.pinPatient);

module.exports = router;
