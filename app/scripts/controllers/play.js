'use strict';

/**
 * @ngdoc function
 * @name drinkingApp.controller:PlayCtrl
 * @description
 * # PlayCtrl
 * Controller of the drinkingApp
 */
angular.module('drinkingApp')
    .controller('PlayCtrl', function ($scope, Players, $location, Game, Quests) {

        $scope.player = {
            name: "",
            effects: []
        };

        $scope.players = Players.getPlayers();

        $scope.addPlayer = function () {

            if ($scope.player.name.length == 0) {
                return;
            }

            if (Players.doesPlayerExist($scope.player.name)) {
                //@TODO modal
                return alert("That player is already in the list");
            }
            Players.addPlayer($scope.player);
            $scope.player.name = "";
            Game.resetGame();
        };

        $scope.removePlayer = function(player){
            Players.removePlayer(player);
            Game.resetGame();
        };
        $scope.removeAllPlayers = function(){
            Players.removeAllPlayers();
            Game.resetGame();
        };

        $scope.newGame = function(){
            Quests.addDeck("base");
            Game.newGame();
            return $location.path('/turn');
        }
    });
