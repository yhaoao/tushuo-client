angular.module('starter.services.auth', [])

.factory('Auth', function( $window, $http, Util,HOST) {
	var Auth = {
		isAuth: function() {
			return $window.localStorage.getItem('auth') && $window.localStorage.getItem('auth') === 'true';
		},
		setAuth: function() {
			$window.localStorage.setItem('auth', 'true');
		},
		setUnauth: function() {
			$window.localStorage.setItem('auth', 'false');
		},
		register: function(username, email, gender, birthday, password) {
			var registerForm = {
				username: username,
				password: password,
				email: email,
				gender: gender,
				birthday: birthday
			};

			return $http.post(HOST+'/register', registerForm).then(function(result) {
				Auth.setAuth();
				return result.data;
			});
		},
		login: function(email, password) {
			var loginForm = {
				email: email,
				password: password
			};
			return $http.post(HOST+'/login', loginForm).then(function(result) {
				Auth.setAuth();
				return result.data;
			});
		},
		logout: function() {
			return $http.get(HOST+'/logout').then(function(result) {
				Auth.reset();
				return result.data;
			});
		},
		reset: function() {
			$window.localStorage.clear();
			Auth.registerUser = {
				gender: 'male'
			};
		},
		registerUser: {
			gender: 'male'
		}

	}
	return Auth;
});