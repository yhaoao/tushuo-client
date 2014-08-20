angular.module('starter.controllers.pub', [])

.controller('PubCtrl', function($scope,Pub) {
	$scope.pub=Pub.currentPub;
});