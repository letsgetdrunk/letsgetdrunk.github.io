'use strict';

/**
 * @ngdoc function
 * @name drinkingApp.controller:TurnCtrl
 * @description
 * # TurnCtrl
 * Controller of the drinkingApp
 */
angular.module('drinkingApp')
    .controller('TurnCtrl', function ($scope, $rootScope, $location, $http) {
        //Check we're OK to play
        if ($rootScope.game == undefined || $rootScope.players == undefined || $rootScope.players.length < 2) {
            $rootScope.gameInProgress = false;
            return $location.path('/');
        }
        var quests = [];
        $rootScope.menuActive = "turn";
        $rootScope.gameInProgress = true;

        var getAQuest = function () {
            $scope.quest = quests[Math.floor(Math.random() * quests.length)];
            for (var i = 0; i < $scope.quest.playerEffects.length; i++) {
                addEffectToPlayer($scope.player, $scope.quest.playerEffects[i]);
            }
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
            for (var i = 0; i < $scope.player.effects.length; i++) {
                if ($scope.player.effects[i].expires !== undefined && $scope.player.effects[i].expires <= $rootScope.turnCounter) {
                    $scope.player.effects.splice(i, 1);
                }
            }
            for (var x = 0; x < $rootScope.game.effects.length; x++) {
                if ($rootScope.game.effects[x].expires !== undefined && $rootScope.game.effects[x].expires <= $rootScope.turnCounter) {
                    $rootScope.game.effects.splice(x, 1);
                }
            }
        };

        $scope.nextPlayer = function (continuing) {
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
            $scope.player = $rootScope.players[$rootScope.currentPlayerIndex];
            clearAnyOutOfDateEffects();
            getAQuest();
        };


        $http.get('json/quests.json')
            .then(function (res) {
                quests = res.data;
                $scope.nextPlayer($rootScope.currentPlayerIndex != undefined);

            });

    });
