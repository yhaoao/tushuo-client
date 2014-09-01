angular.module('starter.controllers.msg', [])

.controller('MsgCtrl', function($scope,$state, Message) {
    Message.getMessages().then(function(messages) {
        $scope.messages = messages;
    });

    $scope.refresh = function() {
        Message.getMessages().then(function(messages) {
            $scope.messages = messages;
            $scope.$broadcast('scroll.refreshComplete');
        });
    };

    $scope.userInfo=function(userId){
		$state.go('tab.userInfoMsg',{id:userId});
	};
});