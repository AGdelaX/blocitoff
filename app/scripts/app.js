var blocItOff = angular.module("BlocItOff", ['firebase']);

blocItOff.factory('Tasks', ['$firebaseArray', function($firebaseArray, $scope){
	var firebaseRef = new Firebase('https://shining-torch-9429.firebaseio.com/');
	var tasklist = $firebaseArray(firebaseRef.child('tasklist'));

	return {
		tasks: tasklist
	};
}]);