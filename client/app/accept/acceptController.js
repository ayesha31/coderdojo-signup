angular.module('coder-dojo-signup')
    .controller('AcceptController', function ($scope) {
        console.log('accept');

        $scope.text = 'You have successfully signed up for the Coder Dojo Girls Event at Bankwest on October 5. ' +
            'You should receive a calendar invite soon and if you have any further' +
        'questions please don\'t hesistate to contact us at: coderdojo@bankwest.com.au';

    });