angular.module('starter.services.message', [])

.factory('Message', function($ionicLoading, $http, HOST) {
	var Message = {
		sendMessage: function(userId, content) {
			return $http.post(HOST + '/message', {
				userId: userId,
				content: content
			}).then(function(result) {
				return result.data;
			}).then(function(result) {
				if (result.err === 0) {
					return true;
				} else {
					return false;
				}
			});
		},
		getMessages: function() {
			return $http.get(HOST + '/message')
				.then(function(result) {
					return result.data;
				}).then(function(result) {
					if (result.err === 0) {
						return result.data;
					} else {
						return null;
					}
				});
		}

	}
	return Message;



});