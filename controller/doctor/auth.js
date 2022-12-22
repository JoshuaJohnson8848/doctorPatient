const Doctor = require('../../models/doctors');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const phone = req.body.phone;
  const specialisation = req.body.specialisation;
  try {
    const existingEmail = await Doctor.findOne({ email: email });
    if (existingEmail) {
      const error = new Error('Email is Already Exist');
      error.status = 422;
      throw error;
    }
    const hashPass = await bcrypt.hash(password, 12);
    if (!hashPass) {
      const error = new Error('Password Hash failed, Something Went Wrong');
      error.status = 422;
      throw error;
    }
    const doctor = new Doctor({
      name: name,
      email: email,
      password: hashPass,
      phone: phone,
      specialisation: specialisation,
      pinnedPatient: mongoose.Types.ObjectId('4edd40c86762e0fb12000003'), //Dummy Data
    });
    const createdDoctor = await doctor.save();
    res
      .status(200)
      .json({ message: 'Doctor Created Succesfully', doctor: createdDoctor });
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
    const doctor = await Doctor.findOne({ email: email });
    if (!doctor) {
      const error = new Error('Account Not Found');
      error.status = 422;
      throw error;
    }
    loadedDoctor = doctor;
    const hashedPass = await bcrypt.compare(password, loadedDoctor.password);
    if (!hashedPass) {
      const error = new Error('Incorrect Password');
      error.status = 422;
      throw error;
    }
    const token = await jwt.sign(
      {
        email: loadedDoctor.email,
        doctorId: loadedDoctor._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    res.status(200).json({
      message: 'Logged In Successfully',
      token: token,
      doctorId: loadedDoctor._id,
    });
  } catch (err) {
    if (!err.status) {
      err.status = 500;
    }
    next(err);
  }
};
