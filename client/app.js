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
      });
  });
}(angular));



