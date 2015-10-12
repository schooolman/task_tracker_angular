var express = require('express');
var router = express.Router();
var path = require('path');
var taskList = require('../models/taskList');
var taskRouter = require('./taskRouter');



/* GET home page. */
router.get('/', function(req, res, next) {
    console.log("hit an empty route");
  res.sendFile(path.join(__dirname, '../views/index.html'));
});



//getting tasklist
router.get('/taskList', function(request, response, next){
    console.log("checking these updates are working");
    response.send(taskList);
    //console.log("task list route" + taskList);
});

router.get('/taskRouter', function(request, response, next){
    console.log("taskrouter hit");
    response.send(taskList);
})

//router.get('/addTask', function(request, response, next){
//    console.log(request);
//    var task = new Task(request.body.item);
//    console.log("adding task!!!!!");
//
//
//    task.save(function(err){
//        if(err)console.log("adding error");
//        response.send(task.toJSON());
//        next();
//
//    })
//
//});

//router.post('/add', function(request, response, next){
//    var addTask = new Task({name: request.body.name});
//    addTask.save(function(err){
//        if(err)console.log('gerrrrr', err);
//        response.send(addTask.toJSON());
//        next();
//    });
//});


//router.get('/tasks', function(request, response, next){
//    return Task.find({}).exec(function(err, task){
//        if(err) throw new Error(err);
//        response.send(JSON.stringify(task));
//        next();
//    });
//});

module.exports = router;

