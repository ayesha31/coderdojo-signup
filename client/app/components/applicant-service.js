(function () {
    angular
        .module('coderdojo-signup')
        .service('ApplicantService', ApplicantService);

    ApplicantService.$inject = [
        '$http',
        '$state',
        'TextConstants'
    ];

    function ApplicantService($http, $state) {
        var applicantData = {
            ninjas: [{}],
            isExternal: false,
            passcode: '',
            activities: {},
            parent: {},
            under12: false
        };

        function sendApplicant() {
            $http.post('/api/ninja', {
                data: applicantData
            }).then(function (res) {
                $state.go('accept');
            }, function (err) {
                console.error(err);
                $state.go('error');
            })
        }

        return {
            applicant: applicantData,
            sendApplicant: sendApplicant
        };
    }
})();
