const Appoinment = require('../../models/appointment');
const Doctor = require('../../models/doctors');

exports.addAppmnt = async (req, res, next) => {
  const doctorId = req.params.id;
  const patientId = req.patientId;
  const dateTime = req.body.dateTime;
  try {
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
