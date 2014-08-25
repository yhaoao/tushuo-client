angular.module('starter.filters.avatar', [])
	.filter('avatar', function() {
		return function(input,gender) {
			if(input){
				return input;
			}

			if(gender==='female'){
				return '/img/female.gif'
			}else{
				return 'img/male.gif'
			}
		};
	});