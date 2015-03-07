angular.module('drinkingApp')
    .service('Game', function (Players, $injector) {
        var self = this;
        var initialProperties = {
            gameInProgress: false,
            turnCounter: 0,
            roundCounter: 0,
            effects: []
        };

        this.properties = angular.copy(initialProperties);

        this.resetGame = function () {
            self.clearGame();
            var Quests = $injector.get('Quests');
            Quests.reset();
        };

        this.clearGame = function () {
            self.properties = angular.copy(initialProperties);
            Players.cleanPlayers();
        };

        this.newGame = function () {
            self.clearGame();
            Players.persistPlayers();
            self.properties.gameInProgress = true;
        };

        this.isGameValid = function () {
            var Quests = $injector.get('Quests');
            return self.properties.gameInProgress && Players.enoughPlayers() && Quests.enoughQuests();
        };

        this.incrementRoundCounter = function () {
            self.properties.roundCounter++;
            self.clearOutOfDateEffects();
        };

        this.incrementTurnCounter = function () {
            self.properties.turnCounter++;
        };

        this.getRoundNumber = function () {
            return self.properties.roundCounter;
        };

        this.clearOutOfDateEffects = function () {
            for (var i = 0; i < self.properties.effects.length; i++) {
                if (self.properties.effects[i].expires !== undefined && self.properties.effects[i].expires <= self.properties.roundCounter) {
                    self.properties.effects.splice(i, 1);
                }
            }
            Players.clearOutOfDateEffects(self.properties.roundCounter);
        };

        this.addEffectToGame = function (effect) {
            var newEffect = {
                title: effect.title,
                type: effect.type
            };
            for (var i = 0; i < self.properties.effects.length; i++) {
                //Do we need to remove an identical one first?
                if (self.properties.effects[i].title == effect.title) {
                    self.properties.effects.splice(i, 1);
                }
            }
            //Does it have a lifespan?
            if (effect.turnLength !== undefined) {
                newEffect.expires = self.getRoundNumber() + effect.turnLength;
            }
            self.properties.effects.push(newEffect);
        };

        return this;

    })
;