(function () {
    angular
        .module('coderdojo-signup')
        .controller('PasscodeController', PasscodeController);

    PasscodeController.$inject = [
        '$http',
        '$state',
        '$scope',
        'ApplicantService'
    ];

    function PasscodeController($http, $state, $scope, ApplicantService) {
        var vm = this;

        vm.passcode = '';
 
        vm.submitPasscode = function() {
            $http.get('/api/ninja', { params: {passcode: vm.passcode }})
                .then(function(res) {
                    if(res.data.passcodeSuccessful) {
                        if(checkPlacesRemaining(res.data)) {
                            ApplicantService.applicant.isExternal = res.data.isExternal;
                            ApplicantService.applicant.passcode = vm.passcode;
                            $state.go('form');
                        } else {
                            $state.go('closed');
                        }
                    } else {
                        $scope.form.passcode.$error.invalid = true;
                    }
                }, function(err) {
                    $state.go('error');
                });
        };

        function checkPlacesRemaining(response) {
            if(response.isExternal && response.externalPlacesRemaining > 0) {
                return true;
            } else if(!response.isExternal && response.bwPlacesRemaining > 0) {
                return true;
            }
            return false;
        }
    }
})();
