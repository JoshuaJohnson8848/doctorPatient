const Doctor = require('../../models/doctors');

exports.getAll = async (req, res, next) => {
  try {
    const doctors = await Doctor.find();
    if (!doctors) {
      const error = new Error('No Doctors Found');
      throw error;
    }
    res.status(200).json({ message: 'Doctors Fetched Succesfuly', doctors });
  } catch (err) {
    if (!err.status) {
      err.status = 500;
    }
    next(err);
  }
};
