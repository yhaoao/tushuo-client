angular.module('starter.services.pub', [])
	.factory('Pub', function() {
		var Pub={
			hello:function(){
				alert('hello');
			},
			currentPub:{}
		};

		return Pub;
	});