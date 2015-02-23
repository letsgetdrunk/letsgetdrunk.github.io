'use strict';

/**
 * @ngdoc overview
 * @name drinkingApp
 * @description
 * # drinkingApp
 *
 * Main module of the application.
 */
angular
  .module('drinkingApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'LocalStorageModule'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/rules', {
        templateUrl: 'views/rules.html',
        controller: 'RulesCtrl'
      })
      .when('/contact', {
        templateUrl: 'views/contact.html',
        controller: 'ContactCtrl'
      })
      .when('/play', {
        templateUrl: 'views/play.html',
        controller: 'PlayCtrl'
      })
      .when('/turn', {
        templateUrl: 'views/turn.html',
        controller: 'TurnCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
