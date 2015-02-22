'use strict';

/**
 * @ngdoc function
 * @name drinkingApp.controller:PlayCtrl
 * @description
 * # PlayCtrl
 * Controller of the drinkingApp
 */
angular.module('drinkingApp')
    .controller('PlayCtrl', function ($scope, $rootScope) {
        $rootScope.menuActive = "play";
        if ($rootScope.players == undefined) {
            $rootScope.players = [];
        }
        $scope.player = {
            name: ""
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
            $rootScope.gameInProgress = false;
        };

        $scope.removePlayer = function(player){
            var index = $rootScope.players.indexOf(player);
            if (index > -1) {
                $rootScope.players.splice(index, 1);
            }
            $rootScope.gameInProgress = false;
        };

    });
