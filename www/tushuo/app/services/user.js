angular.module('starter.services.user', [])

.factory('User', function($localForage, $http) {
	var User = {
		setUser: function(user) {
			return $localForage.setItem('user', user);
		},
		getUser: function() {
			return $localForage.getItem('user');
		},
		updateUser: function(updateInfo) {
			return $http.put('/user', 
					updateInfo
				).then(function() {
				User.getUser().then(function(user) {
					return _.assign(user, updateInfo);
				}).then(function(user) {
					return User.setUser(user);
				});
			});
		}

	}
	return User;



});