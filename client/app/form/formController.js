angular.module('coder-dojo-signup')
    .controller('FormController', function ($scope, $http, $state) {
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
                { name: 'Other', selected: false }
            ],
            dietaryConsiderations: ''
        };

        $scope.addNinja = function () {
            $scope.signup.ninjaInformation.push({name: '', age: '', laptopRequired: false });
        };

        $scope.removeNinja = function (ninja) {
            var index = $scope.signup.ninjaInformation.indexOf(ninja);

            if (index > -1) {
                $scope.signup.ninjaInformation.splice(index, 1);
            }
        };

        $scope.registerNinja = function () {
            console.log('registering');

            var req = {
                method: 'POST',
                url: '/api/registerNinja',
                header: {
                    'Content-Type': 'application/json'
                },
                data: {form: $scope.signup, code: 'test'} // TODO: update with code they are registering with
            };

            $http(req)
                .then(success, error);

            function success(response) {
                console.log('submit form success', response);
                $state.go('accept');
            }

            function error(err) {
                console.log('submit form err', err);
                $state.go('error');
            }
        };
    });