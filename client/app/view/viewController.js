// TODO: update this
angular.module('coderdojo-signup')
.controller('ViewController', function($scope, $http, $state) {
	'use strict';
	$scope.ninjaCount = 0;

	$scope.ninjas = {};

	$scope.isUnder12 = function(date) {
		var timeDiff = Math.abs(date.getTime() - new Date().getTime());
		var diffYears = Math.ceil(timeDiff / (1000 * 3600 * 24 * 365));

		return diffYears < 12; 
	}

	$scope.getNinjaCount = function() {
		ninjaCount++;
		return ninjaCount;
	};

	$http.get('/api/ninjaList')
	.success(function(data) {
		$scope.ninjas = data;
	})
	.error(function(data) {

	});
});
