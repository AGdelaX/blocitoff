"use strict";

var blocItOff = angular.module('BlocItOff', ['firebase', 'ui.router']);

blocItOff.factory('Tasks', ['$firebaseArray', function($firebaseArray, $scope){
	var firebaseRef = new Firebase('https://shining-torch-9429.firebaseio.com/');
	var tasklist = $firebaseArray(firebaseRef.child('tasks'));

	return {
		tasks: tasklist
	};
}]);

blocItOff.run(function(){
	console.log(new Date().getSeconds());
});

blocItOff.config(function($stateProvider, $locationProvider){

	$locationProvider.html5Mode(true);

	// $urlRouterProvider.otherwise('/');

	$stateProvider
	.state('home', {
		url: '/',
		controller: 'TasklistView',
		templateUrl: '/templates/home.html'
	})
	.state('history', {
		url: "/history",
		controller: 'TasklistView',
		templateUrl: '/templates/history.html'
	})
});

blocItOff.controller('TasklistView', ['$scope', 'Tasks', '$timeout', function($scope, Tasks, $timeout){

	$scope.tasklist = Tasks.tasks;

	$scope.removeTask = function(task){

		$scope.tasklist.$remove(task);
		
	}

	// $scope.message = "testing";
	$scope.hideTime = false;

	$scope.taskForm = null;

	// console.log(Date.now());
	// console.log(Tasks.tasks);

	$scope.expirationDate = Date.now();

	$scope.prioritySelector = null;

	var week = 1000 * 60 * 60 * 24 * 7;

	$scope.createTask = function(){

		if ($scope.taskForm !== null) {

		var currentTime = Date.now();

		

		$scope.tasklist.$add( {
			body: $scope.taskForm,
			completed: false,
			timestamp: currentTime + week,
			priority: $scope.prioritySelector
		});

		}


	};


	$scope.completeTask = function (task) {

		console.log('before', $scope.tasklist);

		task.completed = true;

		// task.timestamp = Date.now() + 100;

		$scope.tasklist.$save(task);

		console.log('after', $scope.tasklist);


	};

	// if Date.now > scope.timeTaskWasMade+timePassed
	// 	hide

	

}]);