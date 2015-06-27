angular.module('coder-dojo-signup')
.controller('FormController', function($scope, $http) {
	'use strict';

	$scope.signup = {
		name: '',
		email: '',
		ninjaInformation: [
			{name: '', age: '', laptopRequired: false }
		],
		activities: [
			{ name: 'Scratch', selected: false },
			{ name: 'Unity', selected: false },
			{ name: 'Edison', selected: false }
		],
		dietaryConsiderations: ''
	};

	$scope.addNinja = function() {
		$scope.signup.ninjaInformation.push({name: '', age: '', laptopRequired: false });
	};

	$scope.removeNinja = function(ninja) {
		var index = $scope.signup.ninjaInformation.indexOf(ninja);

		if(index > -1) {
			$scope.signup.ninjaInformation.splice(index, 1);
		};
	};

	$scope.registerNinja = function() {
		console.log('registering');

		var req = {
			method: 'POST',
			url: '/api/registerNinja',
			data: $scope.signup
		};

		$http(req)
			.success(function(data, status, headers, config) {
				console.log(data);
			})
			.error(function(data, status, headers, config) {
				console.log('error');
			});
	};
});