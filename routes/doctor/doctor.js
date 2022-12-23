const express = require('express');
const router = express.Router();
const doctorController = require('../../controller/doctor/doctor');

router.get('', doctorController.getAll);

router.get('/:id', doctorController.getById);

router.post('/:id');

module.exports = router;
