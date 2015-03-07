'use strict';

/**
 * @ngdoc function
 * @name drinkingApp.controller:TurnCtrl
 * @description
 * # TurnCtrl
 * Controller of the drinkingApp
 */
angular.module('drinkingApp')
    .controller('TurnCtrl', function ($scope, $location, $http, $anchorScroll, Game, Players, Quests) {
        //Check we're OK to play
        if (!Game.isGameValid()) {
            Game.resetGame();
            //@TODO tell user
            return $location.path('/');
        }



        //INIT
        $scope = Quests.getNextQuest($scope);

    });
