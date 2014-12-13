angular.module('starter.controllers.main', [])

.controller('MainCtrl', function($scope, $state, $ionicScrollDelegate, $ionicPopup, Post, Util) {

	$scope.$watch('state', function(state) {
		if (state) {
			Post.getPosts(state).then(function(posts) {
				$scope.posts = posts;
			});
		}
	});

	$scope.state = Post.getStateCache();


	$scope.refresh = function() {
		Post.getPosts($scope.state,true).then(function(posts) {
			$scope.posts = posts;
			$scope.$broadcast('scroll.refreshComplete');
		});

	};


	$scope.userInfo = function(id) {
		Post.setStateCache($scope.state);
		$state.go('tab.userInfo', {
			id: id
		});
	};

	$scope.up = function(id) {
		if (Post.isVoted(id)) {
			return Util.toast('已投票');
		}
		Post.up(id).then(function(success) {
			if (success) {
				var post = _.find($scope.posts, function(post) {
					return post._id === id;
				});
				post.up += 1;
				Post.setVoted(id);
			}
		});
	};

	$scope.down = function(id) {
		if (Post.isVoted(id)) {
			return Util.toast('已投票');
		}
		var post = _.find($scope.posts, function(post) {
			return post._id === id;
		});

		post.down += 1;
		Post.setVoted(id);
	};

	$scope.comment = function(id) {
		Post.setStateCache($scope.state);
		$state.go('tab.postDetail', {
			id: id
		});
	};
});