'use strict';

/**
 * @ngdoc overview
 * @name drinkingApp
 * @description
 * # drinkingApp
 *
 * Main module of the application.
 */
String.prototype.toProperCase = function () {
    return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};
var app = angular
    .module('drinkingApp', [
        'ngAnimate',
        'ngAria',
        'ngCookies',
        'ngMessages',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'LocalStorageModule',
        'ngMaterial'
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
