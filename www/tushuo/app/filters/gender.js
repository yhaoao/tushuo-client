angular.module('starter.filters.gender', [])
	.filter('gender', function() {
		return function(input) {
			var map={
				male:'男',
				female:'女'
			}
			
			return map[input];
		};
	});