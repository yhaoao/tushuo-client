angular.module('starter.services.util', [])

.factory('Util', function($ionicLoading) {
	var Util={
		toast:function(content){
			$ionicLoading.show({
				template:content,
				noBackdrop: true,
				duration:1000
			});
		}

	}
	return Util;
	


});