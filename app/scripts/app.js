'use strict';

/**
 * @ngdoc overview
 * @name firebaseSecurityTestApp
 * @description
 * # firebaseSecurityTestApp
 *
 * Main module of the application.
 */
angular
  .module('firebaseSecurityTestApp', [
    'ngRoute',
    'firebase'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
