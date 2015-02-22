'use strict';

/**
 * @ngdoc function
 * @name drinkingApp.controller:TurnCtrl
 * @description
 * # TurnCtrl
 * Controller of the drinkingApp
 */
angular.module('drinkingApp')
    .controller('TurnCtrl', function ($scope, $rootScope, $location) {
        if($rootScope.game == undefined || $rootScope.players == undefined || $rootScope.players.length < 2){
            $rootScope.gameInProgress = false;
            return $location.path('/');
        }
        $rootScope.menuActive = "turn";
        $rootScope.gameInProgress = true;
    });
