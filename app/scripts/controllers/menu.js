'use strict';

/**
 * @ngdoc function
 * @name drinkingApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the drinkingApp
 */
angular.module('drinkingApp')
    .controller('MenuCtrl', function ($scope, $mdSidenav, $log, $location, $mdComponentRegistry) {

        $scope.menuIcon = "menu";

        $scope.$watch(function(){
            return $mdComponentRegistry.get('left') ? $mdSidenav('left').isOpen() : false;
        }, function(showBack){
            $scope.menuIcon = showBack ?"arrow_back" : "menu";
        });

        $scope.menuToggle = function() {
            $mdSidenav('left').toggle();
        };

        $scope.loadPage = function(page){
            $mdSidenav('left').close();
            $location.path(page);
        };

    });
