angular.module('starter.services.auth', [])

.factory('Auth', function($localForage, $window,$http,Util) {
	var Auth = {
		isAuth:function(){
			return $window.localStorage.getItem('auth')==='true';
		},
		setAuth:function(){
			$window.localStorage.setItem('auth','true');
		},
		setUnauth:function(){
			$window.localStorage.setItem('auth','false');
		},
		register:function(username,email,gender,birthday,password){
			var registerForm={
				username:username,
				password:password,
				email:email,
				gender:gender,
				birthday:birthday
			};

			return $http.post('/register',registerForm).then(function(result){
				return result.data;
			});
		},
		login:function(email,password){
			var loginForm={
				email:email,
				password:password
			};
			return $http.post('/login',loginForm).then(function(result){
				return result.data;
			});
		},
		logout:function(){
			return $http.get('/logout').then(function(result){
				return result.data;
			});
		},
		registerUser:{
			gender:'male'
		}

	}
	return Auth;
});