angular.module('starter.controllers.main', [])

.controller('MainCtrl', function($scope) {
	$scope.state='hot';
	$scope.changeState=function(state){
		$scope.state=state;
	};
});