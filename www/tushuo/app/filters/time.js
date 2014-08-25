angular.module('starter.filters.time', [])
	.filter('time', function() {
		return function(input) {
			return moment(input).format('ll');
		};
	});