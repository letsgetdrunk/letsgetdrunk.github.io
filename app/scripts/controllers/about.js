'use strict';

/**
 * @ngdoc function
 * @name drinkingApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the drinkingApp
 */
angular.module('drinkingApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
