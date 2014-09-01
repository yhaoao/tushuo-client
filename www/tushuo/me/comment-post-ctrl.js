angular.module('starter.controllers.commentPost', [])

.controller('CommentPostCtrl', function($scope,$state,Post) {
    Post.getCommentPosts().then(function(posts){
    	$scope.posts=posts;
    });

    $scope.postDetail=function(id){
		$state.go('tab.historyPostDetail', {
			id:id
		});
	}

});