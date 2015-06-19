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

	// $scope.message = "testing";
	$scope.hideTime = false;

	$scope.taskForm = null;

	// console.log(Date.now());
	// console.log(Tasks.tasks);

	$scope.expirationDate = Date.now();

	$scope.prioritySelector = null;

	$scope.createTask = function(){

		var currentTime = Date.now();

		// var week = 60 * 60 * 24 * 7;

		$scope.tasklist.$add( {
			body: $scope.taskForm,
			timestamp: currentTime + 60000,
			priority: $scope.prioritySelector
		});


	};

	// if Date.now > scope.timeTaskWasMade+timePassed
	// 	hide

	

}]);