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
      type: String,
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
        patientId: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: 'Patient',
        },
        date: {
          type: Date,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Doctor', doctorSchema);
