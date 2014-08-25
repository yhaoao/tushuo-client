angular.module('starter.controllers.pub', [])

.controller('PubCtrl', function($scope,Pub) {
	$scope.post={};

	$scope.pub=function(){
		Pub.pubPost($scope.post);
	}
});