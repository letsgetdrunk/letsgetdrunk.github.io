'use strict';

/**
 * @ngdoc function
 * @name drinkingApp.controller:RulesCtrl
 * @description
 * # RulesCtrl
 * Controller of the drinkingApp
 */
angular.module('drinkingApp')
  .controller('RulesCtrl', function ($scope, $rootScope) {
        $rootScope.menuActive = "rules";
        $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
