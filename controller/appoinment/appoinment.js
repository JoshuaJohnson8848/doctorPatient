const mongoose = require('mongoose');
const Appoinment = require('../../models/appointment');
const Doctor = require('../../models/doctors');
const Patient = require('../../models/patients');

exports.addAppmnt = async (req, res, next) => {
  const doctorId = req.params.id;
  const patientId = req.patientId;
  const dateTime = req.body.dateTime;
  try {
    if (!isAuth) {
      const error = new Error('Not Authenticated');
      error.status = 401;
      throw error;
    }
    const appoinment = await new Appoinment({
      doctorId: doctorId,
      patientId: patientId,
      dateTime: dateTime,
    });
    await appoinment.save();
    const doctor = await Doctor.findOne({ _id: doctorId });
    if (!doctor) {
      const error = new Error('Doctor Not Found');
      error.status = 404;
      throw error;
    }
    await doctor.appointments.push(appoinment);
    await doctor.save();
    res.status(200).json({ message: 'Appoinment Added Succesfully', doctor });
  } catch (err) {
    if (!err.status) {
      err.status = 500;
    }
    next(err);
  }
};

exports.listAppmnt = async (req, res, next) => {
  if (!isAuth) {
    const error = new Error('Not Authenticated');
    error.status = 401;
    throw error;
  }
  const doctorId = req.doctorId;
  try {
    const pArray = [];
    let populatedPatient = [];
    const doctor = await Doctor.findById(doctorId)
      .populate('appointments')
      .exec();
    doctor.appointments.forEach((p) => {
      pArray.push(p.patientId);
    });
    for (i = 0; i < pArray.length; i++) {
      const popPatient = await Patient.findById(pArray[i]);
      populatedPatient.push(popPatient);
    }
    res.status(200).json({
      message: 'Appointment List fetched',
      appoinments: doctor.appointments,
      patientsDetails: populatedPatient,
    });
  } catch (err) {
    if (!err.status) {
      err.status = 500;
    }
    next(err);
  }
};
