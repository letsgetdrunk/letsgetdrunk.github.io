'use strict';

/**
 * @ngdoc function
 * @name drinkingApp.controller:TurnCtrl
 * @description
 * # TurnCtrl
 * Controller of the drinkingApp
 */
angular.module('drinkingApp')
    .controller('TurnCtrl', function ($scope, $location, $http, $anchorScroll, Game, Players) {
        //Check we're OK to play
        if (!Game.isGameValid()) {
            Game.resetGame();
            //@TODO tell user
            return $location.path('/');
        }


        $scope.nextPlayer = function (continuing) {
            Players.getNextPlayer();
            $scope.nextQuest();
        };


        $scope.nextQuest = function(){
            $location.hash('appTop');
            $anchorScroll();
            $scope = Quests.getNextQuest($scope);
        };

        //INIT
        $scope = Quests.getNextQuest($scope);

    });
