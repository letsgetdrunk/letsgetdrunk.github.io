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
        
        if ($rootScope.players == undefined) {            
            // see if we got any people in local storage first             
            if (localStorageService.get('players') != null) {                
                $rootScope.players = localStorageService.get('players');                   
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
            $rootScope.turnCounter = undefined;
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
            $rootScope.currentPlayerIndex = undefined;
            
            // save the players we have here to HTML5 local storage for easy selection next time            
            localStorageService.set('players', $rootScope.players);
            
            //Go to the game
            return $location.path('/turn');
        }
    });
