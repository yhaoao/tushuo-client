angular.module('starter.controllers.postDetail', [])

.controller('PostDetailCtrl', function($scope, $state, $ionicModal, $ionicActionSheet, $cordovaCamera, $cordovaFile, Util, Post) {
    $scope.commentForm = {};
    var postId = $state.params.id;

    $ionicModal.fromTemplateUrl('comment-modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.commentModal = modal;
    });

    Post.getPost(postId).then(function(post) {
        $scope.post = post;
        $scope.comments = post.comments;
    });

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

                $scope.commentForm.img = Util.getImageUrlFromResponse(result.response);
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

                $scope.commentForm.img = Util.getImageUrlFromResponse(result.response);
                Util.stopLoading();
            }, function(result) {
                Util.toast('上传失败');
            });
        }
    });

    $scope.openCommentModel = function() {
        $scope.commentModal.show();
    };

    $scope.closeCommentModel = function() {
        $scope.commentModal.hide();
    };

    $scope.addComment = function() {
        if ($scope.commentForm.content.trim() === '') {
            Util.toast('评论不能为空');
            return;
        }

        if (!$scope.commentForm.img) {
            Util.toast('请添加图片');
            return;
        }
        Util.startLoading();
        Post.addComment(postId, $scope.commentForm)
            .then(function(comment) {
                Util.toast('评论成功');
                Util.stopLoading();
                $scope.commentForm = {};
                $scope.commentModal.hide();
                $scope.comments.unshift(comment);
            });
    }


    $scope.userInfo = function(id) {
        $state.go('tab.userInfo', {
            id: id
        });
    };

    $scope.$on('$destroy', function() {
        $scope.commentModal.remove();
    });

});