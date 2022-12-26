const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

app.use(express.json());
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS,GET,POST,PUT,PATCH,DELETE'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type',
    'Authorization'
  );
  next();
});

dotenv.config({ path: './config/.env' });

const authRoutePatient = require('./routes/patient/auth');
const authRouteDoctor = require('./routes/doctor/auth');
const doctorRoute = require('./routes/doctor/doctor');
const patientRoute = require('./routes/patient/patient');
const appoinmentRoute = require('./routes/appointment/appoinment');

app.use('/authPatient', authRoutePatient);
app.use('/authDoctor', authRouteDoctor);
app.use('/doctor', doctorRoute);
app.use('/patient', patientRoute);
app.use('/appmnt', appoinmentRoute);

app.use((error, req, res, next) => {
  const data = error.data;
  const message = error.message;
  const status = error.status || 500;
  res.status(status).json({ message: message, data: data });
});

mongoose.set('strictQuery', true);
mongoose
  .connect(process.env.MONGOURI)
  .then((result) => {
    const server = app.listen(process.env.PORT, (req, res, next) => {
      console.log(`Server is Running at PORT ${process.env.PORT}`);
    });
    const io = require('socket.io')(server);
    io.on('connection', (socket) => {
      Msg.find().then((result) => {
        socket.emit('output-messages', result);
      });
      console.log('a user connected');
      socket.emit('message');
      socket.on('disconnect', () => {
        Msg.deleteMany().then((result) => {
          socket.emit('output-messages', result);
        });
        console.log('user disconnected');
      });
      socket.on('chatmessage', (msg, id) => {
        const message = new Msg({
          msg,
        });
        message.save().then(() => {
          io.emit('message', msg);
        });
      });
    });
  })
  .catch((err) => {
    console.log(err);
  });
