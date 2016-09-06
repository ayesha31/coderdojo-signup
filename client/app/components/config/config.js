(function () {
    angular
        .module('coderdojo-signup')
        .config(config);

    config.$inject = [
        '$stateProvider',
        '$urlRouterProvider'
    ];

    function config($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('form', {
                url: '/form',
                templateProvider: function ($templateCache) {
                    return $templateCache.get('app/form/form.html');
                },
                controller: 'FormController',
                controllerAs: 'vm'
            })
            .state('accept', {
                url: '/accept',
                templateProvider: function ($templateCache) {
                    return $templateCache.get('app/accept/accept.html');
                },
                controller: 'TextController',
                controllerAs: 'vm'
            })
            .state('error', {
                url: '/error',
                templateProvider: function ($templateCache) {
                    return $templateCache.get('app/error/error.html');
                },
                controller: 'TextController',
                controllerAs: 'vm'
            })
            .state('view', {
                url: '/view',
                templateProvider: function ($templateCache) {
                    return $templateCache.get('app/view/view.html');
                },
                controller: 'ViewController'
            })
            .state('closed', {
                url: '/closed',
                templateProvider: function ($templateCache) {
                    return $templateCache.get('app/closed/closed.html');
                },
                controller: 'TextController',
                controllerAs: 'vm'
            })
            .state('passcode', {
                url: '/passcode',
                templateProvider: function ($templateCache) {
                    return $templateCache.get('app/passcode/passcode.html');
                },
                controller: 'PasscodeController',
                controllerAs: 'vm'
            });
    }
})();
