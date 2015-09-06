(function() {
    angular
        .module('coder-dojo-signup')
        .controller('RegisterController', RegisterController);

    RegisterController.$inject = [
        '$scope',
        '$rootScope',
        '$state'
    ];

    function RegisterController($scope, $rootScope, $state) {
        var vm = this;

        vm.code = '';

        vm.submit = submit;

        function submit () {
            alert(vm.code);
        }
    }
})();
