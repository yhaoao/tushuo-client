angular.module('starter.controllers.me', [])

.controller('MeCtrl', function($scope, $ionicPopover, $state, Auth, Util,User) {

    User.getUser().then(function(user){ 
        $scope.user=user;
    });


    $ionicPopover.fromTemplateUrl('more-popover.html', {
        scope: $scope,
    }).then(function(popover) {
        $scope.popover = popover;
    });

    $scope.more = function($event) {
        $scope.popover.show($event);
    };

    $scope.myPost=function(){
        $scope.popover.hide();
        $state.go('tab.myPost');
    }

    $scope.commentPost=function(){
        $scope.popover.hide();
        $state.go('tab.commentPost');
    }

    $scope.feedback=function(){
        $scope.popover.hide();
        $state.go('tab.feedback');
    };

    $scope.settings=function(){
        $scope.popover.hide();
        $state.go('tab.settings');
    };

    $scope.logout = function() {

        Auth.logout().then(function(result) {
            if (result.err !== 0) {
                Util.toast(result.msg);
            } else {
                $scope.popover.hide();
                $state.go('login');
            }
        });
    };

    $scope.editUserInfo=function(){
        $state.go('tab.editMe');
    }
});