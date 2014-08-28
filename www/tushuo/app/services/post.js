angular.module('starter.services.post', [])

.factory('Post', function($localForage, $http, $window) {
	var Post = {
		addPost: function(post) {
			return $http.post('/post', post).then(function(result) {
				return result.data;
			}).then(function(result) {
				if (result.err === 0) {
					return true;
				} else {
					return false;
				}
			});
		},
		getPost:function(id){
			$http.get('/post/'+id).then(function(result){
				alert(JSON.stringify(result));
			});
		},
		getLatestPosts: function() {
			return $http.get('/post?state=latest').then(function(result) {
				return result.data;
			}).then(function(result) {
				if (result.err === 0) {
					return result.data;
				} else {
					return null;
				}
			});
		},
		getHotestPosts: function() {
			return $http.get('/post?state=hotest').then(function(result) {
				return result.data;
			}).then(function(result) {
				if (result.err === 0) {
					return result.data;
				} else {
					return null;
				}
			});
		},
		getNearbyPosts: function() {
			return $http.get('/post?state=nearby').then(function(result) {
				return result.data;
			}).then(function(result) {
				if (result.err === 0) {
					return result.data;
				} else {
					return null;
				}
			});
		},
		up: function(id) {
			return $http.put('/post/' + id, {
				up: 'inc'
			}).then(function(result) {
				return result.data;
			}).then(function(result) {
				alert(JSON.stringify(result));
				if (result.err === 0) {
					return true;
				} else {
					return false;
				}
			});
		},
		down: function() {
			return $http.put('/post/' + id, {
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
		}
	}
	return Post;

});