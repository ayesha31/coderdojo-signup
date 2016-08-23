(function () {
    angular
        .module('coderdojo-signup')
        .controller('FormController', FormController);

    FormController.$inject = [
        '$http',
        '$state',
        'ApplicantService',
        'TextConstants'
    ];

    function FormController($http, $state, ApplicantService, TextConstants) {
        var vm = this;

        var today = new Date();
        vm.minDate = new Date().setFullYear(today.getFullYear() - 17);
        vm.maxDate = new Date().setFullYear(today.getFullYear() - 7);

        vm.addNinja = add;
        vm.removeNinja = remove;
        vm.submit = submit;
        vm.validateDateOfBirth = validateDateOfBirth;

        vm.applicant = ApplicantService.applicant;
        vm.text = TextConstants;

        function add() {
           ApplicantService.applicant.ninjas.push({});
        }

        function remove(index) {
            ApplicantService.applicant.ninjas.splice(index, 1);
        }

        function submit() {
            ApplicantService.sendApplicant();
        }

        function validateDateOfBirth(ninja) {

        }
    }
})();
