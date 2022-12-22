const express = require('express');
const router = express.Router();
const doctorController = require('../../controller/doctor/doctor');

router.get('', doctorController.getAll);

router.get('/:id', doctorController.getById);

module.exports = router;
