const express = require('express');
const router = express.Router();
const doctorController = require('../../controller/doctor/doctor');
const isAuthD = require('../../middleware/isAuthD');
const isAuthP = require('../../middleware/isAuthP');

router.get('', isAuthP, doctorController.getAll);

router.get('/:id', isAuthP, doctorController.getById);

router.post('/:patientId', isAuthD, doctorController.pinPatient);

module.exports = router;
