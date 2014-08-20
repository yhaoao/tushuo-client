angular.module('starter.controllers.me', [])

.controller('MeCtrl', function($scope, $ionicPopover) {
    

    $ionicPopover.fromTemplateUrl('my-popover.html', {
        scope: $scope,
    }).then(function(popover) {
        $scope.popover = popover;
    });

    $scope.more = function($event) {
         $scope.popover.show($event);
    };
});