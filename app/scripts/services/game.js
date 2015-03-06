angular.module('drinkingApp')
    .service('Game', function (Players) {
        var self = this;
        var initialProperties = {
            gameInProgress: false,
            turnCounter: 0,
            roundCounter: 0,
            effects: []
        };

        var properties = angular.copy(initialProperties);

        var clearGame = function(){
            properties = angular.copy(initialProperties);
            Players.cleanPlayers();
        };

        var newGame = function(){
            self.clearGame();
            Players.persistPlayers();
            properties.gameInProgress = true;
        };

        var isGameValid = function(){
            return properties.gameInProgress && Players.enoughPlayers();
        };

        var incrementRoundCounter = function(){
            properties.roundCounter++;
        };

        var incrementTurnCounter = function(){
            properties.turnCounter++;
        };

        return {
            clearGame: self.clearGame,
            newGame: self.newGame,
            isGameValid: self.isGameValid,
            incrementRoundCounter: self.incrementRoundCounter,
            incrementTurnCounter: self.incrementTurnCounter
        };

    });