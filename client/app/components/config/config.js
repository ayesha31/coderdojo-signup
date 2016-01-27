(function () {
    angular
        .module('coderdojo-signup')
        .config(config);

    config.$inject = [
        '$stateProvider',
        '$urlRouterProvider'
    ];

    function config($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/register');

        $stateProvider
            .state('register', {
                url: '/register',
                templateProvider: function ($templateCache) {
                    return $templateCache.get('app/register/register.html');
                },
                controller: 'RegisterController',
                controllerAs: 'vm'
            })
            .state('form', {
                url: '/form',
                params: {
                    code: '',
                    spotsLeft: 0,
                    auth: false
                },
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
                controller: 'AcceptController',
                controllerAs: 'vm'
            })
            .state('error', {
                url: '/error',
                templateProvider: function ($templateCache) {
                    return $templateCache.get('app/error/error.html');
                }
            })
            .state('closed', {
                url: '/closed',
                templateProvider: function ($templateCache) {
                    return $templateCache.get('app/closed/closed.html');
                }
            })
            .state('view', {
                url: '/view',
                templateProvider: function ($templateCache) {
                    return $templateCache.get('app/view/view.html');
                },
                controller: 'ViewController'
            });
    }
})();
