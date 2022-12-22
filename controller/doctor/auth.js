const Doctor = require('../../models/doctors');
const bcrypt = require('bcryptjs');

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
