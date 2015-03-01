'use strict';

/**
 * @ngdoc function
 * @name drinkingApp.controller:PlayCtrl
 * @description
 * # PlayCtrl
 * Controller of the drinkingApp
 */
angular.module('drinkingApp')
    .controller('PlayCtrl', function ($scope, $rootScope, $location, localStorageService) {
        $rootScope.menuActive = "play";
        var avatarColours = [
            "gray",
            "green",
            "yellow",
            "blue",
            "darkBlue",
            "deepBlue",
            "purple",
            "lightPurple",
            "red",
            "pink"
        ];

        if ($rootScope.players == undefined) {
            // see if we got any people in local storage first             
            if (localStorageService.get('players') != null) {
                $rootScope.players = localStorageService.get('players');
                //Fix non-title case
                for (var i = 0; i < $rootScope.players.length; i++) {
                    $rootScope.players[i].name = $rootScope.players[i].name.toProperCase();
                }
            } else {
                $rootScope.players = [];
            }
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
                if (!alreadyExists && $scope.player.name.toLowerCase() == aPlayer.name.toLowerCase()) {
                    alreadyExists = true;
                }
            });
            if (alreadyExists) {
                return alert("That player is already in the list");
            }
            var newPlayer = angular.copy($scope.player);
            newPlayer.colour = avatarColours[Math.floor(Math.random()*avatarColours.length)];
            newPlayer.name = newPlayer.name.toProperCase();
            $rootScope.players.push(newPlayer);
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
            $rootScope.turnCounter = undefined;
            //Clear out any extra in-game data we've got saved against the player, or the game.
            for(var i = 0; i < $rootScope.players.length; i++){
                $rootScope.players[i] = {
                    name: $rootScope.players[i].name.toProperCase(),
                    colour: $rootScope.players[i].colour,
                    effects: []
                }
            }

            //Clear out anything we've saved against the game
            $rootScope.game = {
                effects: []
            };
            $rootScope.currentPlayerIndex = undefined;

            // save the players we have here to HTML5 local storage for easy selection next time
            localStorageService.set('players', $rootScope.players);

            //Go to the game
            return $location.path('/turn');
        }
    });
