'use strict';

/**
 * @ngdoc function
 * @name drinkingApp.controller:PlayCtrl
 * @description
 * # PlayCtrl
 * Controller of the drinkingApp
 */
angular.module('drinkingApp')
    .controller('PlayCtrl', function ($scope, $rootScope, $location) {
        $rootScope.menuActive = "play";
        if ($rootScope.players == undefined) {
            $rootScope.players = [];
        }

        $scope.player = {
            name: "",
            effects: []
        };

        $scope.addPlayer = function () {
            if ($scope.player.name.length == 0) {
                return;
            }
            var alreadyExists = false;
            angular.forEach($rootScope.players, function (aPlayer, key) {
                if (!alreadyExists && $scope.player.name == aPlayer.name) {
                    alreadyExists = true;
                }
            });
            if (alreadyExists) {
                return alert("That player is already in the list");
            }
            $rootScope.players.push(angular.copy($scope.player));
            $scope.player.name = "";
            $rootScope.gameInProgress = false;
        };

        $scope.removePlayer = function(player){
            var index = $rootScope.players.indexOf(player);
            if (index > -1) {
                $rootScope.players.splice(index, 1);
            }
            $rootScope.gameInProgress = false;
        };
        $scope.removeAllPlayers = function(){
            $rootScope.players = [];
            $rootScope.gameInProgress = false;
        };

        $scope.newGame = function(){
            //Clear out any extra in-game data we've got saved against the player, or the game.
            for(var i = 0; i < $rootScope.players.length; i++){
                $rootScope.players[i] = {
                    name: $rootScope.players[i].name,
                    effects: []
                }
            }

            //Clear out anything we've saved against the game
            $rootScope.game = {
                effects: []
            };

            //Go to the game
            return $location.path('/turn');
        }
    });
