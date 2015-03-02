'use strict';

/**
 * @ngdoc function
 * @name drinkingApp.controller:TurnCtrl
 * @description
 * # TurnCtrl
 * Controller of the drinkingApp
 */
angular.module('drinkingApp')
    .controller('TurnCtrl', function ($scope, $rootScope, $location, $http, $anchorScroll) {
        //Check we're OK to play
        if ($rootScope.game == undefined || $rootScope.players == undefined || $rootScope.players.length < 2) {
            $rootScope.gameInProgress = false;
            return $location.path('/');
        }
        var quests = [];
        
        $scope.players_effected = [];
        $rootScope.menuActive = "turn";
        $rootScope.gameInProgress = true;

        var getNextPlayer = function(continuing) {
            if (!continuing) {
                if ($rootScope.currentPlayerIndex == undefined) {
                    $rootScope.currentPlayerIndex = 0;
                } else {
                    $rootScope.currentPlayerIndex = $rootScope.currentPlayerIndex + 1;
                }
                //Too high an index? Back to 0
                if ($rootScope.currentPlayerIndex >= $rootScope.players.length) {
                    $rootScope.currentPlayerIndex = 0;
                }
                //Turn Counter
                if ($rootScope.turnCounter == undefined) {
                    $rootScope.turnCounter = 1;
                } else {
                    $rootScope.turnCounter = $rootScope.turnCounter + 1;
                }
            }
            return $rootScope.players[$rootScope.currentPlayerIndex];
        }

        var getAQuest = function (continuing) {
            $location.hash('appTop');
            $anchorScroll();
            
            // grab a quest for use in this turn
            $scope.quest = quests[Math.floor(Math.random() * quests.length)];
            
            /*
            if the quest uses, affects, whatever the next player, grab them and also assign
            any of the quest player effects
             */
            if ($scope.quest.useNextPlayer != undefined && $scope.quest.useNextPlayer == true) {
                $scope.player = getNextPlayer(continuing);
                
                console.log($scope.player);
                
                // if we have player effects, add those
                if ($scope.quest.playerEffects != undefined) {
                    for (var i = 0; i < $scope.quest.playerEffects.length; i++) {
                        addEffectToPlayer($scope.player, $scope.quest.playerEffects[i]);
                    }
                }
            } else {
                // this quest/turn has no player
                $scope.player = undefined;
            }
            
            // if the quest has some players that are effected, grab those players
            // TODO a thing where if we have a scope.player, we make sure they're not included in
            // who can get randomly selected - but also, maybe this should be on a flag
            if ($scope.quest.playerCountEffected !== undefined) {
                var player_count_to_get = 0;
                
                if ($scope.players.length < $scope.quest.playerCountEffected) {
                    player_count_to_get = $scope.players.length;
                } else {
                    player_count_to_get = $scope.quest.playerCountEffected;
                }
                
                $scope.players_effected = _.sample($rootScope.players, player_count_to_get);
            } else {
                // this quest/turn has no players effected
                $scope.players_effected = [];
            }
            
            // if we have game effects, add those
            for (var x = 0; x < $scope.quest.gameEffects.length; x++) {
                addEffectToGame($scope.quest.gameEffects[x]);
            }
            
        };

        var addEffectToPlayer = function (player, effect) {
            var newEffect = {
                title: effect.title,
                type: effect.type
            };
            for (var i = 0; i < player.effects.length; i++) {
                //Do we need to remove an identical one first?
                if (player.effects[i].title == effect.title) {
                    player.effects.splice(i, 1);
                }
            }
            //Does it have a lifespan?
            if (effect.turnLength !== undefined) {
                newEffect.expires = $rootScope.turnCounter + (effect.turnLength * $rootScope.players.length);
            }
            player.effects.push(newEffect);
        };

        var addEffectToGame = function (effect) {
            console.log(effect);
            var newEffect = {
                title: effect.title,
                type: effect.type
            };
            for (var i = 0; i < $rootScope.game.effects.length; i++) {
                //Do we need to remove an identical one first?
                if ($rootScope.game.effects[i].title == effect.title) {
                    $rootScope.game.effects.splice(i, 1);
                }
            }
            //Does it have a lifespan?
            if (effect.turnLength !== undefined) {
                newEffect.expires = $rootScope.turnCounter + (effect.turnLength * $rootScope.players.length);
            }
            $rootScope.game.effects.push(newEffect);
        };

        var clearAnyOutOfDateEffects = function () {
            
            if ($scope.player != undefined) {
                for (var i = 0; i < $scope.player.effects.length; i++) {
                    if ($scope.player.effects[i].expires !== undefined && $scope.player.effects[i].expires <= $rootScope.turnCounter) {
                        $scope.player.effects.splice(i, 1);
                    }
                }
            }
            
            for (var x = 0; x < $rootScope.game.effects.length; x++) {
                if ($rootScope.game.effects[x].expires !== undefined && $rootScope.game.effects[x].expires <= $rootScope.turnCounter) {
                    $rootScope.game.effects.splice(x, 1);
                }
            }
        };

        $scope.nextPlayer = function (continuing) {
            // if (!continuing) {
            //     if ($rootScope.currentPlayerIndex == undefined) {
            //         $rootScope.currentPlayerIndex = 0;
            //     } else {
            //         $rootScope.currentPlayerIndex = $rootScope.currentPlayerIndex + 1;
            //     }
            //     //Too high an index? Back to 0
            //     if ($rootScope.currentPlayerIndex >= $rootScope.players.length) {
            //         $rootScope.currentPlayerIndex = 0;
            //     }
            //     //Turn Counter
            //     if ($rootScope.turnCounter == undefined) {
            //         $rootScope.turnCounter = 1;
            //     } else {
            //         $rootScope.turnCounter = $rootScope.turnCounter + 1;
            //     }
            // }
            // $scope.player = $rootScope.players[$rootScope.currentPlayerIndex];
            clearAnyOutOfDateEffects();
            
            /*
            gets a random quest
            if quest affects the next player, gets the next player (and applies any player effects from the quest)
            if quest adds game effects, adds those to the game effects
            if the quest has a player effected count, grabs the correct amount of random players and adds them to the scope
             */
            getAQuest(continuing);
        };


        $http.get('json/quests.json')
            .then(function (res) {
                quests = res.data;
                $scope.nextPlayer($rootScope.currentPlayerIndex != undefined);

            });

    });
