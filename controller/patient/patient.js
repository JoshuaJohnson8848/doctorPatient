const isAuthD = require('../../middleware/isAuthD');
const Patient = require('../../models/patients');

exports.getAll = async (req, res, next) => {
  try {
    if (!isAuthD) {
      const error = new Error('Not Authenticated');
      error.status = 401;
      throw error;
    }
    const patients = await Patient.find();
    if (!patients) {
      const error = new Error('Patients Not Found');
      error.status = 404;
      throw error;
    }
    res
      .status(200)
      .json({ message: 'Patients Fetched Successfully', patients });
  } catch (err) {
    if (!err.status) {
      err.status = 500;
    }
    next(err);
  }
};

exports.getById = async (req, res, next) => {
  if (!isAuthD) {
    const error = new Error('Not Authenticated');
    error.status = 401;
    throw error;
  }
  const patientId = req.params.id;
  try {
    const patient = await Patient.findById(patientId);
    if (!patient) {
      const error = new Error('Patient Not Found');
      error.status = 404;
      throw error;
    }
    res.status(200).json({ message: 'Patient Found Successfully', patient });
  } catch (err) {
    if (!err.status) {
      err.status = 500;
    }
    next(err);
  }
};
