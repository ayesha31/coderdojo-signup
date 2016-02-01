(function () {
    angular
        .module('coderdojo-signup')
        .config(config);

    config.$inject = [
        '$stateProvider',
        '$urlRouterProvider'
    ];

    function config($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/form');

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
