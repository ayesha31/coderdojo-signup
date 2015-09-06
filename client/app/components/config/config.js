(function () {
    angular
        .module('coder-dojo-signup')
        .config(config);

    config.$inject = [
        '$stateProvider',
        '$urlRouterProvider'
    ];

    function config($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/closed');

        $stateProvider
            .state('form', {
                url: '/form',
                templateProvider: function ($templateCache) {
                    return $templateCache.get('app/form/form.tpl.html');
                },
                controller: 'FormController'
            })
            .state('accept', {
                url: '/accept',
                templateProvider: function ($templateCache) {
                    return $templateCache.get('app/accept/accept.tpl.html');
                },
                controller: 'AcceptController'
            })
            .state('error', {
                url: '/error',
                templateProvider: function ($templateCache) {
                    return $templateCache.get('app/error/error.tpl.html');
                }
            })
            .state('closed', {
                url: '/closed',
                templateProvider: function ($templateCache) {
                    return $templateCache.get('app/closed/closed.tpl.html');
                }
            })
            .state('view', {
                url: '/view',
                templateProvider: function ($templateCache) {
                    return $templateCache.get('app/view/view.tpl.html');
                },
                controller: 'ViewController'
            });
    }
})();
