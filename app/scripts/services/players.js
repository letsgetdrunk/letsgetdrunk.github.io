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
            currentPlayerIndex: -1
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

        //INIT
        if (localStorageService.get('players') != null) {
            properties.players = localStorageService.get('players');
            cleanPlayers();
        }


        return {
            doesPlayerExist: self.doesPlayerExist,
            addPlayer: self.addPlayer,
            removePlayer: self.removePlayer,
            removeAllPlayers: self.removeAllPlayers,
            cleanPlayers: self.cleanPlayers,
            persistPlayers: self.persistPlayers,
            enoughPlayers: self.enoughPlayers,
            getNextPlayer: self.getNextPlayer,
            getCurrentPlayer: self.getCurrentPlayer
        };

    });