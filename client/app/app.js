angular.module('coderdojo-signup', ['ui.router'])
    .run(function($http, $state, ApplicantService) {
        $http.get('/api/ninja')
            .then(function(res) {
                if(res.data.passcodeRequired) {
                    $state.go('passcode');
                } else {
                    if(res.data.bwPlacesRemaining > 0) {
                        ApplicantService.isExternal = false;
                        $state.go('form');
                    } else {
                        $state.go('closed');
                    }
                }
            }, function(err) {
                $state.go('error');
            });
    });