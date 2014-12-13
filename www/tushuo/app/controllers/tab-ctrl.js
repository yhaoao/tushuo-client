angular.module('starter.controllers.tab', [])

.controller('TabCtrl', function($scope, $cordovaGeolocation,$state,User,Auth) {
    $cordovaGeolocation
        .getCurrentPosition()
        .then(function(position) {
            var loc = {
                longitude: position.coords.longitude,
                latitude: position.coords.latitude,
                timestamp: Date.now()
            };

            User.updateUser({loc:loc});
        });
    if(!Auth.isAuth()){
    	$state.go('login');
    }
});