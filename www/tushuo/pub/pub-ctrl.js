angular.module('starter.controllers.pub', [])

.controller('PubCtrl', function($scope, $ionicActionSheet, $cordovaFile, $cordovaCamera, IMGHOST, Post, Util) {
	$scope.post = {};

	$scope.pub = function() {
		if (!$scope.post.desp || $scope.post.desp.trim() === '') {
			Util.toast('描述不能为空');
		} else if (!$scope.post.img) {
			Util.toast('请上传图片');
		} else {
			Post.addPost($scope.post).then(function(success) {
				Util.toast('发布成功');
				$scope.post = {};
			},function(err){
				Util.toast(JSON.stringify(err));
			});
		}
	};

	$scope.addImg = function() {
		$ionicActionSheet.show({
			buttons: [{
				text: '拍照'
			}, {
				text: '选取文件'
			}, ],
			titleText: '修改头像',
			cancelText: '取消',
			buttonClicked: function(index) {
				Util.startLoading();
				Util.getUploadToken().then(function(token) {
					$scope.token = token;
				});

				if (index === 0) {

					var options = {
						quality: 60,
						saveToPhotoAlbum: false
					};

					$cordovaCamera.getPicture(options).then(function(imageUrl) {
						$scope.imgCache = imageUrl;

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
						$scope.imgCache = imageUrl;
					}, function(err) {
						Util.toast('获取图片错误');
					});
				}
				return true;
			}
		});
	};

	$scope.$watch('imgCache', function(imgCache) {
		if ($scope.imgCache && $scope.token) {
			$cordovaFile.uploadFile('http://up.qiniu.com', $scope.imgCache, {
				params: {
					token: $scope.token
				}
			}).then(function(result) {
				$scope.post.img = Util.getImageUrlFromResponse(result.response);
				Util.stopLoading();
			}, function(result) {
				Util.toast('上传失败');
			});
		}

	});


	$scope.$watch('token', function(token) {
		if ($scope.imgCache && $scope.token) {
			$cordovaFile.uploadFile('http://up.qiniu.com', $scope.imgCache, {
				params: {
					token: $scope.token
				}
			}).then(function(result) {

				$scope.post.img = Util.getImageUrlFromResponse(result.response);
				Util.stopLoading();
			}, function(result) {
				Util.toast('上传失败');
			});
		}
	});
});