const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const doctorSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    specialisation: {
      type: String,
      required: true,
    },
    pinnedPatient: {
      type: Schema.Types.ObjectId,
      ref: 'Patient',
    },
    appointments: [
      {
        appntmtId: {
          type: Schema.Types.ObjectId,
          ref: 'Appointment',
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Doctor', doctorSchema);
