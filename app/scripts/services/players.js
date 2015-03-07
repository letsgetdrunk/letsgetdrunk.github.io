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
        var properties = angular.copy(initialProperties);

        var doesPlayerExist = function (playerName) {
            angular.forEach(properties.players, function (aPlayer) {
                if (playerName.toLowerCase() == aPlayer.name.toLowerCase()) {
                    return true;
                }
            });
            return false;
        };

        var addPlayer = function (player) {
            var newPlayer = angular.copy(player);
            newPlayer.colour = avatarColours[Math.floor(Math.random() * avatarColours.length)];
            newPlayer.name = newPlayer.name.toProperCase();
            properties.players.push(newPlayer);
        };

        var removePlayer = function (player) {
            var index = properties.players.indexOf(player);
            if (index > -1) {
                properties.players.splice(index, 1);
            }
        };
        var removeAllPlayers = function () {
            properties.players = [];
        };

        var cleanPlayers = function () {
            for (var i = 0; i < properties.players.length; i++) {
                properties.players[i] = {
                    name: properties.players[i].name.toProperCase(),
                    colour: properties.players[i].colour,
                    effects: []
                }
            }
        };

        var persistPlayers = function () {
            localStorageService.set('players', properties.players);
        };

        var enoughPlayers = function () {
            return properties.players.length > 1;
        };

        var getNextPlayer = function () {
            var Game = $injector.get('Game');
            properties.currentPlayerIndex++;
            //Too high an index? Back to 0
            if (properties.currentPlayerIndex >= properties.players.length) {
                properties.currentPlayerIndex = 0;
                Game.incrementRoundCounter();
            }
            Game.incrementTurnCounter();

            return getCurrentPlayer();
        };

        var getCurrentPlayer = function(){
            return properties.players[properties.currentPlayerIndex];
        };

        var clearOutOfDateEffects = function(roundNumber){
            angular.forEach(properties.players, function (player) {
                for (var i = 0; i < player.effects.length; i++) {
                    if (player.effects[i].expires !== undefined && player.effects[i].expires <= roundNumber) {
                        player.effects.splice(i, 1);
                    }
                }
            });
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
                var Game = $injector.get('Game');
                newEffect.expires = Game.getRoundNumber() + effect.turnLength;
            }
            player.effects.push(newEffect);
        };

        var getPlayers = function(){
          return properties.players;
        };

        //INIT
        if (localStorageService.get('players') != null) {
            properties.players = localStorageService.get('players');
            cleanPlayers();
        }


        return this;

    });