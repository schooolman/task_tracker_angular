var express = require('express');
var path = require('path');
//var favicon = require('serve-favicon');
//var routes = require('./routes/index');
//var users = require('./routes/users');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
var index = require('./routes/index');
var taskRouter = require('./routes/taskRouter');
var Task = require('./models/task');

var app = express();

var mongoURI = "mongodb://localhost:27017/tasklistdatabase";

var mongoDB = mongoose.connect(mongoURI).connection;

mongoDB.once('open', function(){
  console.log('Connected to MongoDB!');
});

mongoDB.on('error', function(err){
  if(err){
    console.log('MongoDB error', err);
  }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// view engine setup
app.set('views', path.join(__dirname, 'views'));


 //uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', routes);
app.use('/', index);
app.use('/taskrouter', taskRouter);
app.get('/gettask', function(request, response, next){
  Task.find({}, function(err, tasks){
    if(err) throw err;
    response.send(tasks);
  })
});
//app.use('/taskList', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  //err.status = 404;
  next(err);
});




module.exports = app;
