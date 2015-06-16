"use strict";

var blocItOff = angular.module('BlocItOff', ['firebase', 'ui.router']);

blocItOff.factory('Tasks', ['$firebaseArray', function($firebaseArray, $scope){
	var firebaseRef = new Firebase('https://shining-torch-9429.firebaseio.com/');
	var tasklist = $firebaseArray(firebaseRef.child('tasklist'));

	return {
		tasks: tasklist
	};
}]);

blocItOff.run(function(){
	console.log("running");
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
});

blocItOff.controller('TasklistView', ['$scope', 'Tasks', function($scope, Tasks){
	$scope.tasklist = Tasks.tasks;
	$scope.message = "testing";
}]);