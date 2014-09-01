angular.module('starter.controllers.userInfo', [])

.controller('UserInfoCtrl', function($scope, $state, $ionicModal, User, Message, Util) {
	var userId = $state.params.id;
	var meId = User.getUserId();

	$scope.isMe=meId === userId;

	User.getUserInfo(userId).then(function(user) {
		$scope.user = user;
	});

	$ionicModal.fromTemplateUrl('send-message-modal.html', {
		scope: $scope,
		animation: 'slide-in-up'
	}).then(function(modal) {
		$scope.sendMessageModal = modal;
	});

	$scope.messageForm = {};

	$scope.openSendMessageModal = function() {
		$scope.sendMessageModal.show();
	};

	$scope.closeSendMessageModal = function() {
		$scope.sendMessageModal.hide();
	};

	$scope.sendMessage = function(msg) {
		Message.sendMessage(userId, msg).then(function(success) {
			if (success) {
				Util.toast('发送成功');
				$scope.messageForm = {};
				$scope.sendMessageModal.hide();
			}
		});
	}

});