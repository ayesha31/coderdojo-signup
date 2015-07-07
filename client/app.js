(function (angular) {
  'use strict';
  angular.module('coder-dojo-signup', [
    'ngFx',
    'ui.router'])
  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/form');

    $stateProvider
      .state('form', {
        url: '/form',
        templateUrl: 'form/form.tpl.html',
        controller: 'FormController'
      })
      .state('accept', {
        url: '/accept',
        templateUrl: 'accept/accept.tpl.html',
        controller: 'AcceptController'
      })
      .state('error', {
        url: '/error',
        templateUrl: 'error/error.tpl.html'
      })
      .state('view', {
        url: '/view',
        templateUrl: 'view/view.tpl.html',
        controller: 'ViewController'
      });
  });
}(angular));