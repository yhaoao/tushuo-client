angular.module('starter.controllers.pub', [])

.controller('PubCtrl', function($scope, Post, Util) {
	$scope.post = {};

	$scope.pub = function() {
		if (!$scope.post.desp||$scope.post.desp.trim()==='') {
			Util.toast('描述不能为空');
		} else {
			Post.addPost($scope.post).then(function(success) {
				Util.toast('发布成功');
				$scope.post = {};
			});
		}
	}
});