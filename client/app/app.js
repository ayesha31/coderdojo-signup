angular.module('coderdojo-signup', ['ui.router', 'coderdojo-signup.config'])
    .run(function ($http, $state, ApplicantService, passcodeRequired) {
        if (passcodeRequired) {
            $state.go('passcode');
        }
        else {
            $http.get('/api/ninja')
                .then(function (res) {
                    if (res.data.bwPlacesRemaining > 0) {
                        ApplicantService.isExternal = false;
                        $state.go('form');
                    } else {
                        $state.go('closed');
                    }

                }, function (err) {
                    $state.go('error');
                });
        }
    });