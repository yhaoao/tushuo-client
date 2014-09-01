angular.module('starter.controllers.login', [])

.controller('LoginCtrl', function($rootScope, $scope, $state, User, Auth, Util) {
	$scope.loginForm = {};

	$scope.login = function() {
		var email = $scope.loginForm.email;
		var password = $scope.loginForm.password;

		if (!email) {
			Util.toast('请输入邮箱');
		} else if (!password) {
			Util.toast('请输入密码');
		} else {
			Auth.login(email, password).then(function(result) {
				User.setUserId(result.data._id);
				User.setUser(result.data).then(function() {
					$state.go('tab.main');
				});
			});
		}
	}
});