angular.module('starter.controllers.myPost', [])

.controller('MyPostCtrl', function($scope,$state, Post) {
	Post.getMyPosts().then(function(posts) {
		$scope.posts = posts;
	});

	$scope.postDetail=function(id){
		$state.go('tab.historyPostDetail', {
			id:id
		});
	}

});