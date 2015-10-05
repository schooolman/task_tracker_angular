var express = require('express');
var router = express.Router();
var path = require('path');
var taskList = require('../models/taskList');


/* GET home page. */
router.get('/', function(req, res, next) {
    console.log("hit an empty route");
  res.sendFile(path.join(__dirname, '../views/index.html'));
});



//getting tasklist
router.get('/taskList', function(request, response, next){
    console.log("checking");
    response.send(taskList);

    //res.send(path.join);
    //var task = JSON.parse
    //console.log("task list route" + taskList);
});

router.get('/addTask', function(request, response, next){
    console.log(request);
    var task = new Task(request.body.item);
    console.log("adding task!!!!!");

    task.save(function(err){
        if(err)console.log("adding error");
        response.send(task.toJSON());
        next();

    })

});

module.exports = router;


//var kitty = new Cat({name: request.body.name});
//response.send(kitty.toJSON());
//next();
function Task(item) {
    this.item = item;
}