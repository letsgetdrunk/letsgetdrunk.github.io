'use strict';

/**
 * @ngdoc function
 * @name drinkingApp.controller:ContactCtrl
 * @description
 * # ContactCtrl
 * Controller of the drinkingApp
 */
angular.module('drinkingApp')
  .controller('ContactCtrl', function ($scope, $rootScope) {
    $rootScope.menuActive = "contact";
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
