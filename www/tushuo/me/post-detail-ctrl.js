angular.module('starter.controllers.historyPostDetail', [])

.controller('HistoryPostDetailCtrl', function($scope, $state,Util, Post) {
	var id=$state.params.id;

	Post.getPost(id).then(function(post){
		$scope.post=post;
	});

});