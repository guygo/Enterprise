const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const dotenv = require('dotenv');
dotenv.config();

const Auth=require('./routes/Auth');
const employeesRouter = require('./routes/Employee');
const calendarRouter = require('./routes/Calendar');
const departmentsRouter = require('./routes/Departments');
const mongoose = require("mongoose");
mongoose
  .connect(
    'mongodb://localhost:27017/Enterprise'
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});


app.use(logger('dev'));


app.use('/images',express.static(path.join(__dirname, 'public/images')));

//app.use('/', indexRouter);
app.use('/api/Auth', Auth);
app.use('/api/calendar',calendarRouter);
app.use('/api/Employees',employeesRouter);
app.use('/api/departments', departmentsRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('error');
});

module.exports = app;
