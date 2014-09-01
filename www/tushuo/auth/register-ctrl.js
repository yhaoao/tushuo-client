angular.module('starter.controllers.register', [])

.controller('RegisterCtrl', function($rootScope, $scope, $state, Auth, Util, User) {
	$scope.registerForm = Auth.registerUser;

	$scope.register = function() {
		var username = Auth.registerUser.username ? Auth.registerUser.username : Auth.registerUser.email;
		var email = Auth.registerUser.email;
		var password = Auth.registerUser.password;
		var birthday = Auth.registerUser.birthday;
		var gender = Auth.registerUser.gender;

		if (!birthday) {
			Util.toast('请输入生日');
		} else if (!gender) {
			Util.toast('请输入性别');
		} else {
			Auth.register(username, email, gender, birthday, password).then(function(result) {
				if (result.err !== 0) {
					Util.toast(result.msg);
				} else {
					User.setUserId(result.data._id);
					User.setUser(result.data).then(function() {
						$state.go('tab.main');
					});
				}
			});
		}
	};

	$scope.secondStep = function() {
		var username = $scope.registerForm.username ? $scope.registerForm.username : $scope.registerForm.email;
		var email = $scope.registerForm.email;
		var password = $scope.registerForm.password;
		var confirmPassword = $scope.registerForm.confirmPassword;


		if (!email) {
			Util.toast('请输入正确邮箱');
		} else if (!password) {
			Util.toast('请输入密码');
		} else if (password !== confirmPassword) {
			Util.toast('两次输入密码不一致');
		} else {
			$state.go('registerSecond');
		}
	}
});