const Doctor = require('../../models/doctors');
const Patient = require('../../models/patients');
const mongoose = require('mongoose');

exports.getAll = async (req, res, next) => {
  try {
    if (!isAuth) {
      const error = new Error('Not Authenticated');
      error.status = 401;
      throw error;
    }
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

exports.getById = async (req, res, next) => {
  if (!isAuth) {
    const error = new Error('Not Authenticated');
    error.status = 401;
    throw error;
  }
  const doctorId = req.params.id;
  try {
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      const error = new Error('Doctor Not Found');
      error.status = 404;
      throw error;
    }
    res.status(200).json({ message: 'Doctor Found Successfully', doctor });
  } catch (err) {
    if (!err.status) {
      err.status = 500;
    }
    next(err);
  }
};

exports.pinPatient = async (req, res, next) => {
  if (!isAuth) {
    const error = new Error('Not Authenticated');
    error.status = 401;
    throw error;
  }
  const doctorId = req.doctorId;
  const patientId = req.params.patientId;
  try {
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      const error = new Error('Doctor Not Found');
      error.status = 422;
      throw error;
    }
    const patients = await Patient.find();
    if (!patients) {
      const error = new Error('Patients Not Found');
      error.status = 422;
      throw error;
    }
    const updatedPatients = await patients.filter((p) => {
      if (p._id.toString() !== patientId.toString()) {
        return p;
      }
    });
    const patient = await Patient.findById(patientId);
    if (!patient) {
      const error = new Error('Patient Not Found');
      error.status = 422;
      throw error;
    }
    doctor.pinnedPatient = mongoose.Types.ObjectId(patientId);
    await doctor.save();
    res.status(200).json({
      message: 'Patient Pinned Successfully',
      doctor,
      ...patient._doc,
      updatedPatients,
    });
  } catch (err) {
    if (!err.status) {
      err.status = 500;
    }
    next(err);
  }
};
