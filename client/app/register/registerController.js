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
                data: vm.code
            };

            $http(req)
                .then(success, error);

            function success(response) {
                console.log(response);

                $state.go('form');
            }

            function error(response) {
                console.log(response);

                if (status === 401) {
                    alert('Sorry, that code is invalid');
                }
                else {
                    $state.go('error');
                }
            }

        }
    }
})();
