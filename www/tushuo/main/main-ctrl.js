angular.module('starter.controllers.main', [])

.controller('MainCtrl', function($scope, $state, Post, Util) {
	$scope.state = 'hot';

	Post.getLatestPosts().then(function(posts) {
		$scope.posts = posts;
	});
	$scope.changeState = function(state) {
		$scope.state = state;
	};

	$scope.refresh = function() {
		Post.getLatestPosts().then(function(posts) {
			$scope.posts = posts;
			$scope.$broadcast('scroll.refreshComplete');
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

	$scope.comment = function(post) {
		$state.go('tab.postDetail', {
			post: JSON.stringify(post)
		});
	};
});