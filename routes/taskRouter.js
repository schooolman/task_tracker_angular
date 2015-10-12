var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
//var taskData = require('../models/task');
var Task = require('../models/task');



//getting stored tasks
router.get('/gettask', function(req, res, next) {
    Task.find({}, function(err, task){
        //res.json(task);
        console.log('hit get task route');
        res.send(task)

    })
});


router.post('/newtask', function(request, response, next){

    var task = new Task(request.body);
    task.save(function(err){
        console.log(task);
        //if (err) throw err;
        console.log('user saved successfully');
    });
    response.send(task);
});

router.put('/update', function(request, response, next){
    var updateTask = request.body;
    console.log("what is update task: " + updateTask);
    Task.findById(updateTask._id, function(err, task){
    if (err) throw err;
        task.done = true;

        task.save();
        console.log("this is task ", task);
    })
});

router.post('/remove', function(request, response, next){
    //var doneStatus = request;

    Task.remove({done : true}, function(err, done){
        if (err) throw err;
            console.log('deleted user');
    });
    response.send("done");
});



module.exports = router;