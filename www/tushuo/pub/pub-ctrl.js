angular.module('starter.controllers.pub', [])

.controller('PubCtrl', function($scope,Post,Util) {
	$scope.post={};

	$scope.pub=function(){
		Post.addPost($scope.post).then(function(success){
			if(success){
				Util.toast('发布成功');
				$scope.post={};
			}
		});
	}
});