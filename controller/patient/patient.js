const Patient = require('../../models/patients');

exports.getAll = async (req, res, next) => {
  try {
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
