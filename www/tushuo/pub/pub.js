angular.module('starter.services.pub', [])
	.factory('Pub', function($http) {
		var Pub={
			pubPost:function(post){
				
				$http.post('/post',post).then(function(result){
					return result.data;
				});
			}
		};

		return Pub;
	});