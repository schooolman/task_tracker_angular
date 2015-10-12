var mongoose = require('mongoose');
var Schema = mongoose.Schema;



var taskSchema = new Schema({
    item: String,
    done: Boolean
});

var Task = mongoose.model('Task', taskSchema);

module.exports = Task;