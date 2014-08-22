angular.module('starter.controllers.me', [])

.controller('MeCtrl', function($scope, $ionicPopover, $state, Auth, Util) {


    $ionicPopover.fromTemplateUrl('my-popover.html', {
        scope: $scope,
    }).then(function(popover) {
        $scope.popover = popover;
    });

    $scope.more = function($event) {
        $scope.popover.show($event);
    };

    $scope.logout = function() {

        Auth.logout().then(function(result) {
            if (result.err !== 0) {
                Util.toast(result.msg);
            } else {
                Auth.setUnauth();
                $scope.popover.hide();
                $state.go('login');
            }
        });

    };
});