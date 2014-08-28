angular.module('starter.controllers.postDetail', [])

.controller('PostDetailCtrl', function($scope, $state, $ionicModal) {
	$scope.post = JSON.parse($state.params.post);

	$ionicModal.fromTemplateUrl('my-modal.html', {
		scope: $scope,
		animation: 'slide-in-up'
	}).then(function(modal) {
		$scope.modal = modal;
	});

	$scope.openCommentModel = function() {
		$scope.modal.show();
	};

	$scope.closeCommentModel = function() {
		$scope.modal.hide();
	};

	$scope.comment=function(){
		alert('hello');
	};

	$scope.$on('$destroy', function() {
		$scope.modal.remove();
	});

});