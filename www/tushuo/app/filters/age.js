angular.module('starter.filters.age', [])
	.filter('age', function() {
		return function(input) {
			var now=moment();
			var birthday=moment(input);
			
			return now.year()-birthday.year();
		};
	});