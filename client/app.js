var app = angular.module('taskApp', []);

app.controller('MainController', ['$scope', '$http', function($scope, $http){

    $scope.newTask = {};
    $scope.freshTask = '';
    $scope.newTaskList = [];
    //$scope.taskDataBase = [];
    //$scope.taskName = '';




    //Load tasks, from JSON, on page load
    //var loadTasks = function(){
    //    console.log("before the return");
    //    return $http.get('/taskList').then(function(response){
    //        $scope.newTaskList = response.data;
    //        if(response.status !== 200){
    //            throw new Error('Failed to get tasks');
    //        }
    //        $scope.newTaskList = response.data;
    //        console.log('hitting load stored json and response' + response.data);
    //        return response.data;
    //
    //    });
    //};


    var loadTaskDB = function(){

        return $http.get('/gettask').then(function(response){
            //$scope.taskDataBase = response.data;
            if(response.status !== 200){
                throw new Error('Failed to get tasks');
            }
            $scope.newTaskList = [];
            for(var i = 0; i < response.data.length; i++){
                $scope.newTaskList.push(response.data[i]);
            }

            console.log('This is the current database: ' + $scope.newTaskList);
            //$scope.newTaskList = response.data;
            return response.data;
        //
        });
    };

    $scope.addData = function(task) {
        var sendData = '{"item": "' + $scope.freshTask + '", "done":"false"}';
        //task = "{item: " + task + "}";
        console.log("attempting to add to database " + sendData);
        //task = $scope.freshTask;
        //return $http.post('/taskrouter/newtask', sendData).then(function(response){
        //    if(response.status !== 200){
        //        throw new Error('failed to post');
        //    }
            //loadTaskDB();

        //});
        $http({
            method: "POST",
            url: "/taskRouter/newtask",
            data: sendData
        }).then(function(response){
            console.log(response);
            loadTaskDB();
        })

    };

    //remove completed tasks
    $scope.removeDone = function (){
        for(var i = 0; i < $scope.newTaskList.length; i++) {
            console.log($scope.newTaskList.length);
            if($scope.newTaskList[i].done === true){
                $scope.newTaskList.splice(i, 1);
                i--;
            }

        }

    };



    //Sort completed to bottom of list
    $scope.sort = function(){
        for(var i = 0; i < $scope.newTaskList.length; i++){
            if($scope.newTaskList[i].done == true){
                console.log($scope.newTaskList[i]);
                var move = $scope.newTaskList.splice(i, 1);
                $scope.newTaskList.push(move[0]);
                return $scope.newTaskList;
            }
        }

        //$scope.changeDataBoolean($scope.newTaskList[index]);
    };


    $scope.changeDataBoolean = function(taskItem){
        taskItem = $scope.newTaskList[taskItem];
            console.log("task item data boolean: " + taskItem._id);
            var sendData = taskItem;
            $http({
                method: "PUT",
                url: "taskRouter/update",
                data: sendData
            })
    };

    $scope.removeAllDone = function(){
        //taskItem =
        //var sendData = doneStatus;
        //console.log(sendData);
        $http({
            method: "POST",
            url: "taskRouter/remove"
            //data: sendData
        }).then(function(request, response){
            console.log("reloading tasks next");
            loadTaskDB();
            return response.data
        });
        //loadTaskDB();
    };

    //$scope.reloadTaskList = function(){
    //    loadTaskDB();
    //};


    //loadTasks();
    loadTaskDB();

}]);



