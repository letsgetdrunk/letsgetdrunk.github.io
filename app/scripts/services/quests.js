angular.module('drinkingApp')
    .service('Quests', function (Players, Game) {
        var self = this;
        var scope;
        var deckNames = [
            'base'
        ];
        var decks = {};
        var helpers = {};
        var initialProperties = {
            currentQuest: undefined,
            currentDeck: undefined,
            activeDecks: []
        };


        this.properties = angular.copy(initialProperties);

        this.reset = function () {
            self.properties = angular.copy(initialProperties);
        };

        this.getNextQuest = function (scope) {
            try {
                return self.getQuest(scope);
            }
            catch (e) {
                //Oops
                console.log("Quest threw exception");
                console.log(e);
                self.properties.quests.splice(questIndex, 1);
                return self.getNextQuest(scope);
            }
        };

        this.getQuest = function (theScope) {
            scope = theScope;
            var questObject = getRandomQuestObject();
            self.properties.currentQuest = questObject;
            self.properties.currentDeck = questObject.deck;
            helpers.setScopeDefaults();
            return questObject.runFunction();
        };

        var getRandomQuestObject = function () {
            var totalQuests = 0;
            for (var i = 0; i < self.properties.activeDecks.length; i++) {
                totalQuests += self.properties.activeDecks[i].quests.length;
            }
            var questIndex = Math.floor(Math.random() * totalQuests);
            var lowestIndex = 0;
            var highestIndex = -1;
            for (var x = 0; x < self.properties.activeDecks.length; x++) {
                var deckLength = self.properties.activeDecks[x].quests.length;
                highestIndex += (deckLength);
                if (highestIndex >= questIndex) {
                    var deckIndex = (questIndex - lowestIndex);
                    return {
                        deck: self.properties.activeDecks[x].properties,
                        runFunction: self.properties.activeDecks[x].quests[deckIndex]
                    };
                }
                lowestIndex = highestIndex;
            }
            console.log("Random Quest selection failed!?");
        };

        this.addDeck = function (deckName) {
            self.properties.activeDecks = self.properties.activeDecks.concat(decks[deckName]);
        };

        this.enoughQuests = function () {
            return self.properties.activeDecks.length > 0;
        };

        /**
         *
         * Standard Quest Helpers
         *
         */

        helpers.setScopeDefaults = function () {
            scope.game = Game.properties;
            scope.deck = self.properties.currentDeck;
            scope.quest = {};
            scope.quest.successFunction = function () {
                Game.turn(scope, true);
            };
            scope.quest.failureFunction = function () {
                Game.turn(scope, false);
            };
            scope.quest.successButtonEnabled = true;
            scope.quest.successButtonTitle = "I AM A GOD!";
            scope.quest.failureButtonEnabled = true;
            scope.quest.failureButtonTitle = "I SUCK!";
        };

        helpers.getRandomOpponents = function (numberOfOpponents){
            var currentPlayer = Players.getCurrentPlayer();
            var opponents = [];
            var playerIndexArray = [];
            for (var i =0; i < Players.properties.players.length; i++){
                playerIndexArray.push(i);
            }
            playerIndexArray.splice(Players.properties.currentPlayerIndex, 1);
            while(numberOfOpponents > 0 && playerIndexArray.length > 0){
                var opponentIndex = Math.floor(Math.random() * playerIndexArray.length);
                console.log(playerIndexArray);
                console.log(opponentIndex);
                console.log(Players.properties.players);
                opponents.push(Players.properties.players[playerIndexArray[opponentIndex]]);
                playerIndexArray.splice(opponentIndex, 1);
            }
            return opponents;

        };


        //Decklarations.... get it?

        decks.base = {
            properties: {
                title: "Base"
            },
            quests: [
                function () {
                    //Test Quest
                    scope.quest.title = "Basic Quest";
                    scope.quest.description = "Do a thing and it won't be your turn, fail and it's still your turn";
                    return scope;
                },
                function () {
                    //Test Quest
                    var currentPlayer = Players.getCurrentPlayer();
                    var percentageOfOtherPlayersToBattle = 40;
                    var numberOfOpponents = Math.ceil((Players.properties.players.length -1) * (percentageOfOtherPlayersToBattle / 100));
                    var opponents = helpers.getRandomOpponents(numberOfOpponents);
                    var opponentNames = [];
                    for (var i = 0; i < opponents.length; i++){
                        opponentNames.push(opponents[i].name);
                    }
                    scope.quest.title = "Biggie!";
                    scope.quest.description = "Oh no, " + currentPlayer.name + "!";
                    scope.quest.description += " You've wandered into a tongue monster's cave with";
                    scope.quest.description += " " + opponentNames.join(", ");
                    scope.quest.description +=  " and the monster can hear you breathing.";
                    scope.quest.description +=  " To survive without being brutally licked you'll have to hold your breath the longest.";
                    scope.quest.description +=  " Manage and you'll be granted awesome powers, fail and everyone will feel sorry for you.";
                    scope.quest.successFunction = function () {
                        //Good stuff

                        //Always do this
                        Game.turn(scope, true);
                    };
                    scope.quest.failureFunction = function () {
                        //Bad stuff

                        //Always do this
                        Game.turn(scope, false);
                    };
                    return scope;
                }
            ]
        };

        return this;

    });