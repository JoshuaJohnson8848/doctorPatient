const Patient = require('../../models/patients');
const bcrypt = require('bcryptjs');

exports.signup = async (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const phone = req.body.phone;
  try {
    const existingEmail = await Patient.findOne({ email: email });
    if (existingEmail) {
      const error = new Error('Email Already Exist');
      error.status = 422;
      throw error;
    }
    const hashPass = await bcrypt.hash(password, 12);
    if (!hashPass) {
      const error = new Error('Password Not Hashed Something Went Wrong');
      error.status = 422;
      throw error;
    }
    const patient = new Patient({
      name: name,
      email: email,
      password: hashPass,
      phone: phone,
    });
    const createdPatient = await patient.save();
    res.status(200).json({
      message: 'Patient Successfully Created',
      patient: createdPatient,
    });
  } catch (err) {
    if (!err.status) {
      err.status = 500;
    }
    next(err);
  }
};
