angular.module('starter.controllers.feedback', [])

.controller('FeedbackCtrl', function($scope, Feedback,Util) {
	$scope.feedbackForm = {};

	$scope.addFeedback = function() {
		Feedback.addFeedback($scope.feedbackForm.content).then(function(success){
			if(success){
				$scope.feedbackForm = {};
				Util.toast('反馈成功');
			}
		});
	};
});