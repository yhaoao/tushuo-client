angular.module('starter.controllers.main', [])

.controller('MainCtrl', function($scope, $state, Post, Util) {
	var updatePosts=function(state){
		switch (state) {
			case 'hotest':
				return Post.getHotestPosts().then(function(posts) {
					$scope.posts = posts;
				});
				break;
			case 'latest':
				return Post.getLatestPosts().then(function(posts) {
					$scope.posts = posts;
				});
				break;

			case 'nearby':
				return Post.getNearbyPosts().then(function(posts) {
					$scope.posts = posts;
				});
				break;
		}
	};

	$scope.changeState = function(state) {
		$scope.state = state;
		updatePosts(state);
	};

	$scope.changeState('hotest');

	$scope.refresh = function() {
		updatePosts($scope.state).then(function(){
			$scope.$broadcast('scroll.refreshComplete');
		});

	};

	$scope.userInfo = function(id) {
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
		$state.go('tab.postDetail', {
			id: id
		});
	};
});