angular.module('starter.services.post', [])

.factory('Post', function($http,$q, $window, HOST) {
	var Post = {
		addPost: function(post) {
			return $http.post(HOST + '/post', post)
				.then(function(result) {
					return result.data;
				}).then(function(result) {
					if (result.err === 0) {
						return true;
					} else {
						return false;
					}
				});
		},
		getPost: function(id) {
			return $http.get(HOST + '/post/' + id).then(function(result) {
				return result.data
			}).then(function(result) {
				if (result.err === 0) {
					return result.data;
				} else {
					return null;
				}
			});
		},
		getPosts: function(state,update) {
			var promise = $http.get(HOST + '/post?state=' + state)
				.then(function(result) {
					return result.data;
				}).then(function(result) {
					if (result.err === 0) {
						Post.cache[state] = result.data;
						return Post.cache[state];
					} else {
						return null;
					}
				});

			if(update){
				return promise;
			}
			if (Post.cache[state]) {
				return $q.when(Post.cache[state]);
			} else {
				return promise;
			}
		},
		up: function(id) {
			return $http.put(HOST + '/post/' + id, {
				up: 'inc'
			}).then(function(result) {
				return result.data;
			}).then(function(result) {
				if (result.err === 0) {
					return true;
				} else {
					return false;
				}
			});
		},
		down: function() {
			return $http.put(HOST + '/post/' + id, {
				down: 'inc'
			}).then(function(result) {
				return result.data;
			}).then(function(result) {
				if (result.err === 0) {
					return true;
				} else {
					return false;
				}
			});
		},
		isVoted: function(id) {
			var vote = $window.localStorage.getItem('voted:' + id);
			return vote && vote === 'true';
		},
		setVoted: function(id) {
			$window.localStorage.setItem('voted:' + id, 'true');
		},
		addComment: function(postId, comment) {

			return $http.post(HOST + '/post/' + postId + '/comment', {
				comment: comment
			}).then(function(result) {
				return result.data;
			}).then(function(result) {
				if (result.err === 0) {
					return result.data;
				} else {
					return null;
				}
			});

		},
		getComments: function(postId) {
			return $http.get(HOST + '/post/' + postId + '/comment')
				.then(function(result) {
					return result.data;
				})
				.then(function(result) {
					if (result.err === 0) {
						return result.data;
					} else {
						return null;
					}
				})
		},
		getStateCache:function(){
			return Post.cache.state||'hotest';
		},
		setStateCache:function(state){
			Post.cache.state=state;
		},
		cache: {
			posts: {},
			state:''
		}
	}
	return Post;

});