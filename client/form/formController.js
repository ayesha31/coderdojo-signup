angular.module('coder-dojo-signup')
.controller('FormController', function($scope, $http, $state) {
	'use strict';

	$scope.signup = {
		name: '',
		email: '',
		ninjaInformation: [
			{ name: '', age: '', laptopRequired: false }
		],
		activities: [
			{ name: 'Scratch', selected: false },
			{ name: 'Raspberry Pi', selected: false },
			{ name: 'Edison Robots', selected: false },
			{ name: 'LEGO Mindstorm Robots', selected: false },
			{ name: 'Website Development', selected: false },
			{ name: 'Unity Game Development', selected: false },
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
				$state.go('accept');
			})
			.error(function(data, status, headers, config) {
				$state.go('error');
			});
	};
});