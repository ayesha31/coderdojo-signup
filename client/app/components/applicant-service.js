(function() {
    angular
        .module('coderdojo-signup')
        .service('ApplicantService', ApplicantService);

    ApplicantService.$inject = [
		  '$http',
      '$state'
    ];

    function ApplicantService($http, $state) {
      var applicantData = {
        isExternal: false,
        passcode: '',
        ninjas: [{}],
        activities: [],
      };
		
      function sendApplicant() {
        $http.post('/api/ninja', {
          data: applicantData
        }).then(function(res) {
          $state.go('accept');
        }, function(err) {
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
