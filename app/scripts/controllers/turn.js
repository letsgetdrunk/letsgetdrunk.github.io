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
        if ($rootScope.game == undefined || $rootScope.players == undefined || $rootScope.players.length < 2) {
            $rootScope.gameInProgress = false;
            return $location.path('/');
        }
        $rootScope.menuActive = "turn";
        $rootScope.gameInProgress = true;

        var nextPlayer = function () {
            //Next
            $rootScope.currentPlayerIndex = $rootScope.currentPlayerIndex + 1;
            //Too high an index? Back to 0
            if ($rootScope.currentPlayerIndex >= $rootScope.players.length) {
                $rootScope.currentPlayerIndex = 0;
            }
        };

        //Set player to first one, unless we're continuing a game, in which case, next.
        if ($rootScope.currentPlayerIndex == undefined) {
            $rootScope.currentPlayerIndex = 0;
        } else {
            nextPlayer();
        }



    });
