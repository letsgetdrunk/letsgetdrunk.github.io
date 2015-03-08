angular.module('drinkingApp')
    .service('Players', function (localStorageService, $injector) {

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

        var self = this;
        var initialProperties = {
            players: [],
            currentPlayerIndex: 0
        };
        this.properties = angular.copy(initialProperties);

        this.doesPlayerExist = function (playerName) {
            var isTrue = false;
            angular.forEach(self.properties.players, function (aPlayer) {
                if (!isTrue && playerName.toLowerCase() == aPlayer.name.toLowerCase()) {
                    isTrue = true;
                }
            });
            return isTrue;
        };

        this.addPlayer = function (player) {
            var newPlayer = angular.copy(player);
            newPlayer.colour = avatarColours[Math.floor(Math.random() * avatarColours.length)];
            newPlayer.name = newPlayer.name.toProperCase();
            self.properties.players.push(newPlayer);
        };

        this.removePlayer = function (player) {
            var index = self.properties.players.indexOf(player);
            if (index > -1) {
                self.properties.players.splice(index, 1);
            }
        };
        this.removeAllPlayers = function () {
            self.properties = angular.copy(initialProperties);
        };

        this.cleanPlayers = function () {
            for (var i = 0; i < self.properties.players.length; i++) {
                self.properties.players[i] = {
                    name: self.properties.players[i].name.toProperCase(),
                    colour: self.properties.players[i].colour,
                    effects: []
                }
            }
        };

        this.persistPlayers = function () {
            localStorageService.set('players', self.properties.players);
        };

        this.enoughPlayers = function () {
            return self.properties.players.length > 1;
        };

        this.getNextPlayer = function () {
            var Game = $injector.get('Game');
            self.properties.currentPlayerIndex++;
            //Too high an index? Back to 0
            if (self.properties.currentPlayerIndex >= self.properties.players.length) {
                self.properties.currentPlayerIndex = 0;
                Game.incrementRoundCounter();
            }
            Game.incrementTurnCounter();

            return self.getCurrentPlayer();
        };

        this.getCurrentPlayer = function(){
            return self.properties.players[self.properties.currentPlayerIndex];
        };

        this.clearOutOfDateEffects = function(roundNumber){
            angular.forEach(self.properties.players, function (player) {
                for (var i = 0; i < player.effects.length; i++) {
                    if (player.effects[i].expires !== undefined && player.effects[i].expires <= roundNumber) {
                        player.effects.splice(i, 1);
                    }
                }
            });
        };

        this.getRandomOpponents = function (numberOfOpponents){
            var currentPlayer = self.getCurrentPlayer();
            var opponents = [];
            var playerIndexArray = [];
            for (var i =0; i < self.properties.players.length; i++){
                playerIndexArray.push(i);
            }
            playerIndexArray.splice(self.properties.currentPlayerIndex, 1);
            while(numberOfOpponents > 0 && playerIndexArray.length > 0){
                var opponentIndex = Math.floor(Math.random() * playerIndexArray.length);
                opponents.push(self.properties.players[playerIndexArray[opponentIndex]]);
                playerIndexArray.splice(opponentIndex, 1);
            }
            return opponents;

        };

        this.addEffectToPlayer = function (player, effect) {
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
                var Game = $injector.get('Game');
                newEffect.expires = Game.getRoundNumber() + effect.turnLength;
            }
            player.effects.push(newEffect);
        };

        this.getPlayers = function(){
          return self.properties.players;
        };

        //INIT
        if (localStorageService.get('players') != null) {
            self.properties.players = localStorageService.get('players');
            self.cleanPlayers();
        }

        return this;

    });