(function () {
    angular
        .module('coderdojo-signup')
        .controller('FormController', FormController);

    FormController.$inject = [
        '$http',
        '$state',
        '$scope',
        'ApplicantService',
        'TextConstants'
    ];

    function FormController($http, $state, $scope, ApplicantService, TextConstants) {
        var vm = this;

        var today = new Date();
        vm.minDate = new Date().setFullYear(today.getFullYear() - 18);
        vm.maxDate = new Date().setFullYear(today.getFullYear() - 7);

        vm.addNinja = add;
        vm.removeNinja = remove;
        vm.submit = submit;
        vm.validateDateOfBirth = validateDateOfBirth;

        vm.applicant = ApplicantService.applicant;
        vm.text = TextConstants;
        
        initialise();
        
        function initialise() {
            $http.get('/api/ninja')
                .then(function(res) {
                    if(res.data.passcodeRequired && !ApplicantService.applicant.passcodeSuccessful) {
                        $state.go('passcode');
                    }
                }, function(err) {
                    $state.go('error');
                });
        }

        function add() {
           ApplicantService.applicant.ninjas.push({});
        }

        function remove(index) {
            ApplicantService.applicant.ninjas.splice(index, 1);
        }

        function submit() {
            var invalid = false;

            for(var i = 0; i < ApplicantService.applicant.ninjas.length; i++) {
                invalid = $scope.form['ninjaBday' + i].$error.invalid;
            }

            if(!($scope.form.$error.invalid || invalid)) {
                ApplicantService.sendApplicant();
            }
        }

        function validateDateOfBirth(ninja, index) {
            var ninjaString = 'ninjaBday' + index;
            $scope.form[ninjaString].$error.invalid = vm.minDate > ninja.dateOfBirth.getTime() || vm.maxDate < ninja.dateOfBirth.getTime();
            ApplicantService.applicant.ninjas[index].under12 = new Date().setFullYear(today.getFullYear() - 12) < ninja.dateOfBirth.getTime();
        }
    }
})();
