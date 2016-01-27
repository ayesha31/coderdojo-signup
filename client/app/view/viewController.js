// TODO: update this
angular.module('coderdojo-signup')
.controller('ViewController', function($scope, $http, $state) {
	'use strict';
	$scope.ninjaCount = 0;

	$scope.ninjas = {};

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