'use strict';

/**
 * @ngdoc function
 * @name drinkingApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the drinkingApp
 */
angular.module('drinkingApp')
  .controller('MainCtrl', function ($scope, $rootScope) {
        $rootScope.menuActive = "main";
        $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
