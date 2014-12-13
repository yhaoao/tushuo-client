angular.module('starter.services.user', [])

.factory('User', function($http, HOST,$window) {
	var User = {
		setUser: function(user) {
			return $window.localStorage.setItem('user', JSON.stringify(user));
		},
		setUserId: function(userId) {
			$window.localStorage.setItem('userId', userId);
		},
		getUserId: function(userId) {
			return $window.localStorage.getItem('userId');
		},
		getUser: function() {
			return JSON.parse($window.localStorage.getItem('user'));
		},
		updateUser: function(updateInfo) {
			return $http.put(HOST + '/user',
				updateInfo
			).then(function() {
				var user=User.getUser();
				user=_.assign(user, updateInfo);
				User.setUser(user);
				
			});
		},
		getUserInfo: function(id) {
			return $http.get(HOST + '/user/' + id)
				.then(function(result) {
					return result.data;
				})
				.then(function(result) {
					if (result.err === 0) {
						return result.data;
					} else {
						return null;
					}
				});
		}

	}
	return User;



});