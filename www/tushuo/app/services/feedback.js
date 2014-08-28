angular.module('starter.services.feedback', [])

.factory('Feedback', function($http) {
	var Feedback={
		addFeedback:function(content){
			return $http.post('/feedback',{
				content:content
			}).then(function(result){
				return result.data;
			}).then(function(result) {
				if (result.err === 0) {
					return true;
				} else {
					return false;
				}
			});
		}

	}
	return Feedback;
	


});