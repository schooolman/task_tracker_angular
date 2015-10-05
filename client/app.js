var app = angular.module('taskApp', []);

app.controller('MainController', ['$scope', '$http', function($scope, $http){

    $scope.newTask = "";
    $scope.newTaskList = [];
    $scope.taskName = '';




    //$http.get('/taskList').then(function(response){
    //    $scope.newTaskList = response.data;
    //
    //    console.log("this is the new task list response: " + $scope.newTaskList[0].task);
    //    return response.data;
    //
    //});

    $scope.createTask = function(){
        console.log("clicking");

    };


    var loadTasks = function(){
        return $http.get('/taskList').then(function(response){
            $scope.newTaskList = response.data;
            if(response.status !== 200){
                throw new Error('Failed to get tasks');
            }
            $scope.newTask = {};
            $scope.newTaskList = response.data;
            console.log("this is the new task list respons: " + $scope.newTaskList[0].task);
            return response.data;

        });
    };

    //adding tasks?

    $scope.add = function(){
        var taskTemp = {};
        taskTemp.item = $scope.newTask;

        console.log('hit add task functionality: ' + taskTemp);
        //return $http.post('/addTask', newTask).then(loadTasks);

    };

    loadTasks();



}]);



