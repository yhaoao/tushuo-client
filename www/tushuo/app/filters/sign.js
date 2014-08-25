angular.module('starter.filters.sign', [])
	.filter('sign', function() {
		return function(input) {
			input = input || '';

			if (!input) {
				input = '暂无签名';
			}
			return input;
		};
	});