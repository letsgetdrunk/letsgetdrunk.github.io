angular.module('drinkingApp')
    .service('Game', function (Players, $injector) {
        var self = this;
        var initialProperties = {
            gameInProgress: false,
            turnCounter: 0,
            roundCounter: 0,
            effects: []
        };

        var properties = angular.copy(initialProperties);

        var resetGame = function () {
            clearGame();
            var Quests = $injector.get('Quests');
            Quests.reset();
        };

        var clearGame = function () {
            properties = angular.copy(initialProperties);
            Players.cleanPlayers();
        };

        var newGame = function () {
            clearGame();
            Players.persistPlayers();
            properties.gameInProgress = true;
        };

        var isGameValid = function () {
            var Quests = $injector.get('Quests');
            return properties.gameInProgress && Players.enoughPlayers() && Quests.enoughQuests();
        };

        var incrementRoundCounter = function () {
            properties.roundCounter++;
            clearOutOfDateEffects();
        };

        var incrementTurnCounter = function () {
            properties.turnCounter++;
        };

        var getRoundNumber = function () {
            return properties.roundCounter;
        };

        var clearOutOfDateEffects = function () {
            for (var i = 0; i < properties.effects.length; i++) {
                if (properties.effects[i].expires !== undefined && properties.effects[i].expires <= properties.roundCounter) {
                    properties.effects.splice(i, 1);
                }
            }
            Players.clearOutOfDateEffects(properties.roundCounter);
        };

        var addEffectToGame = function (effect) {
            var newEffect = {
                title: effect.title,
                type: effect.type
            };
            for (var i = 0; i < properties.effects.length; i++) {
                //Do we need to remove an identical one first?
                if (properties.effects[i].title == effect.title) {
                    properties.effects.splice(i, 1);
                }
            }
            //Does it have a lifespan?
            if (effect.turnLength !== undefined) {
                newEffect.expires = Game.getRoundNumber() + effect.turnLength;
            }
            properties.effects.push(newEffect);
        };

        return this;

    })
;