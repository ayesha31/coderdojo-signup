(function () {
    angular
        .module('coder-dojo-signup')
        .controller('RegisterController', RegisterController);

    RegisterController.$inject = [
        '$http',
        '$scope',
        '$rootScope',
        '$state'
    ];

    function RegisterController($http, $scope, $rootScope, $state) {
        var vm = this;

        vm.code = '';

        vm.submit = submit;

        function submit() {
            vm.code = vm.code.trim().toLowerCase();
            vm.code = vm.code.replace(/\s+/g, '');

            console.log(vm.code);

            var req = {
                method: 'POST',
                url: '/api/validateCodes',
                header: {
                    'Content-Type': 'application/json'
                },
                data: {text: vm.code}
            };

            $http(req)
                .then(success, error);

            function success(response) {
                console.log(response);

                var data = {code: response.data.code, spotsLeft: response.data.spotsLeft, auth: true};

                $rootScope.$broadcast('Register.CodeValid', data);

                console.log('params', data);
                $state.go('form');
            }

            function error(error) {
                console.log(error);

                if (error.status === 401) {
                    alert('Sorry, that code is invalid, please check that you typed it correctly');
                }
                else if (error.status === 403) {
                    $state.go('closed');
                }
                else {
                    $state.go('error');
                }
            }

        }
    }
})();
