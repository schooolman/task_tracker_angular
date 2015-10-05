var app = angular.module('taskApp', []);

app.controller('MainController', ['$scope', '$http', function($scope, $http){

    $scope.newTask = {};
    $scope.freshTask = '';
    $scope.newTaskList = [];
    $scope.taskName = '';



    //Load tasks, from JSON, on page load
    var loadTasks = function(){
        return $http.get('/taskList').then(function(response){
            $scope.newTaskList = response.data;
            if(response.status !== 200){
                throw new Error('Failed to get tasks');
            }
            $scope.newTaskList = response.data;
            return response.data;

        });
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

    //adding tasks
    $scope.add = function(){
        if($scope.freshTask == ''){
            alert("please enter task");
        }else{
            var taskTemp = {};
            taskTemp.item = $scope.freshTask;
            taskTemp.done = false;

            $scope.newTaskList.push(taskTemp);
            $scope.freshTask = '';
            console.log($scope.newTaskList);
            $scope.sort();
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
    };



    loadTasks();

}]);



