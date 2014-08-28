angular.module('starter.filters.timeAgo', [])
	.filter('timeAgo', function() {
		return function(input) {
			return moment(input).fromNow();;
		};
	});