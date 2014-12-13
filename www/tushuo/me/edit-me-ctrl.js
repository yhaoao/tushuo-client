angular.module('starter.controllers.editMe', [])

.controller('EditMeCtrl', function($scope, $state, $ionicActionSheet, $cordovaFile, $cordovaCamera, IMGHOST, Util, User) {
	$scope.editMeForm = {};

	$scope.user = User.getUser();
	$scope.avatar=$scope.user.avatar;

	$scope.save = function() {
		User.updateUser(
			$scope.editMeForm
		).then(function(result) {
			Util.toast('修改成功');
		});

	};

	$scope.changeAvatar = function() {
		$ionicActionSheet.show({
			buttons: [{
				text: '拍照'
			}, {
				text: '选取文件'
			}, ],
			titleText: '修改头像',
			cancelText: '取消',
			buttonClicked: function(index) {

				Util.getUploadToken().then(function(token) {
					$scope.token = token;
				});
				Util.startLoading();

				if (index === 0) {

					var options = {
						quality: 60,
						saveToPhotoAlbum: false
					};

					$cordovaCamera.getPicture(options).then(function(imageUrl) {
						$scope.img = imageUrl;

					}, function(err) {
						Util.toast('相机设置错误');
					});
				} else if (index === 1) {
					var options = {
						sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
						destinationType: Camera.DestinationType.FILE_URI,
						quality: 60
					};

					$cordovaCamera.getPicture(options).then(function(imageUrl) {
						$scope.img = imageUrl;

					}, function(err) {
						Util.toast('获取图片错误');
					});
				}
				return true;
			}
		});
	};

	$scope.$watch('img', function(img) {
		if ($scope.img && $scope.token) {
			if ($scope.img && $scope.token) {
				$cordovaFile.uploadFile('http://up.qiniu.com', $scope.img, {
					params: {
						token: $scope.token
					}
				}).then(function(result) {

					var imgUrl = IMGHOST + result.response.slice(5, -1) + '?imageView/1/w/300/h/300/q/30';
					User.updateUser({
						avatar: imgUrl
					}).then(function() {
						$scope.avatar = imgUrl;
						Util.stopLoading();
						Util.toast('修改头像成功');
					});
				}, function(result) {
					Util.toast('修改失败');
				});
			}

		}
	});


	$scope.$watch('token', function(token) {
		if ($scope.img && $scope.token) {
			$cordovaFile.uploadFile('http://up.qiniu.com', $scope.img, {
				params: {
					token: $scope.token
				}
			}).then(function(result) {

				var imgUrl = IMGHOST + result.response.slice(5, -1) + '?imageView/1/w/300/h/300/q/30';
				User.updateUser({
					avatar: imgUrl
				}).then(function() {
					$scope.avatar = imgUrl;
					Util.stopLoading();
					Util.toast('修改头像成功');
				});
			}, function(result) {
				Util.toast('修改失败');
			});
		}
	});


});