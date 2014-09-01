angular.module('starter.controllers.postDetail', [])

.controller('PostDetailCtrl', function($scope, $state, $ionicModal,Util, Post) {
	$scope.commentForm = {};
	var postId=$state.params.id;

	$ionicModal.fromTemplateUrl('comment-modal.html', {
		scope: $scope,
		animation: 'slide-in-up'
	}).then(function(modal) {
		$scope.commentModal = modal;
	});

	Post.getPost(postId).then(function(post){
		$scope.post=post;
		$scope.comments=post.comments;
	});

	$scope.openCommentModel = function() {
		$scope.commentModal.show();
	};

	$scope.closeCommentModel = function() {
		$scope.commentModal.hide();
	};

	$scope.comment = function() {
		if($scope.commentForm.content.trim()===''){
			Util.toast('评论不能为空');
		}else{
			Post.addComment(postId, $scope.commentForm.content)
			.then(function(comment){
				Util.toast('评论成功');
				$scope.commentForm = {};
				$scope.commentModal.hide();
				$scope.comments.unshift(comment);
			});
		}
	};

	$scope.userInfo=function(id){
		$state.go('tab.userInfo',{id:id});
	}

	$scope.$on('$destroy', function() {
		$scope.commentModal.remove();
	});

});