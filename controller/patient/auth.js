const Patient = require('../../models/patients');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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

exports.login = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const patient = await Patient.findOne({ email: email });
    if (!patient) {
      const error = new Error('Patient Not Found With this Email');
      error.status = 422;
      throw error;
    }
    loadedPatient = patient;
    const hashedPass = await bcrypt.compare(password, loadedPatient.password);
    if (!hashedPass) {
      const error = new Error('Password Incorrect');
      error.status = 500;
      throw error;
    }
    const token = await jwt.sign(
      {
        email: email,
        patientId: loadedPatient._id.toString(),
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    res
      .status(200)
      .json({
        message: 'Logged In Successfully',
        token: token,
        patientId: loadedPatient._id.toString(),
      });
  } catch (err) {
    if (!err.status) {
      err.status = 500;
    }
    next(err);
  }
};
