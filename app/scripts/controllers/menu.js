'use strict';

/**
 * @ngdoc function
 * @name drinkingApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the drinkingApp
 */
angular.module('drinkingApp')
    .controller('MenuCtrl', function ($scope, $mdSidenav, $log) {

        $scope.toggleLeft = function() {
            $mdSidenav('left').toggle()
                .then(function(){
                    $log.debug("toggle left is done");
                });
        };

        $scope.close = function() {
            $mdSidenav('left').close()
                .then(function(){
                    $log.debug("close LEFT is done");
                });
        };

    });
