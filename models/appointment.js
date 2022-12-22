const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const appointmentSchema = new Schema({
  doctorId: {
    type: Schema.Types.ObjectId,
    ref: 'Doctor',
  },
  patientId: {
    type: Schema.Types.ObjectId,
    ref: 'Patient',
  },
  dateTime: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model('Appointment', appointmentSchema);
