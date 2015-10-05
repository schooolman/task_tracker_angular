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
            //console.log("this is the new task list respons: " + $scope.newTaskList[0].item);
            //console.log("This is newTask" + $scope.newTask.item);
            return response.data;

        });
    };

    //remove completed tasks
    $scope.removeDone = function (){
        //console.log("current array of tasks" + $scope.newTaskList);
        //var loopLength = $scope.newTaskList.length;
        for(var i = 0; i < $scope.newTaskList.length; i++) {
            console.log($scope.newTaskList.length);
            if($scope.newTaskList[i].done === true){
                //console.log("this is the loop: " + $scope.newTaskList[i].done);
                $scope.newTaskList.splice(i, 1);
                i--;
            }

        }

    };

    //adding tasks
    $scope.add = function(){
        if($scope.freshTask == ''){
            alert("please enter task");
        }else {
            var taskTemp = {};
            taskTemp.item = $scope.freshTask;
            taskTemp.done = false;

            //console.log('hit add task functionality: ' + taskTemp.item);
            $scope.newTaskList.push(taskTemp);
            $scope.freshTask = '';
            console.log($scope.newTaskList);
            $scope.sort();
        }
    };


    //Sort completed to bottom of list
    $scope.sort = function(){
        //console.log("clicking");
        for(var i = 0; i < $scope.newTaskList.length; i++){
            if($scope.newTaskList[i].done == true){
                console.log($scope.newTaskList[i]);
                //var moveItem = $scope.newTaskList[i];
                var move = $scope.newTaskList.splice(i, 1);
                $scope.newTaskList.push(move[0]);
                return $scope.newTaskList;
                //console.log($scope.newTaskList);

            }
        }
    };



    //Remove items from task list
    $scope.completeTask = function(array, index){

        var completeItem = array.indexOf(index);
        //$scope.newTaskList.splice(completeItem, 1);
        $scope.changeCSS();
    };

    loadTasks();

}]);



