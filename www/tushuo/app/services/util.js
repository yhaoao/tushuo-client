angular.module('starter.services.util', [])

.factory('Util', function($ionicLoading, $http, HOST,IMGHOST,CLIPIMG) {
	var Util = {
		toast: function(content) {
			$ionicLoading.show({
				template: content,
				noBackdrop: true,
				duration: 1000
			});
		},
		getUploadToken: function() {
			return $http.get(HOST + '/get_token').then(function(result) {
				return result.data.token;
			});
		},
		startLoading: function() {
			$ionicLoading.show({
				template: '<i class="icon ion-loading-a"></i>'
			});
		},
		stopLoading: function() {
			$ionicLoading.hide();
		},
		getImageUrlFromResponse:function(res){
			return IMGHOST + res.slice(5, -1)+CLIPIMG;
		}

	}
	return Util;



});