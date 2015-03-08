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
            scope.player = Players.getCurrentPlayer();
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


        //Decklarations.... get it?

        decks.base = {
            properties: {
                title: "Base"
            },
            quests: [

                //Simple as fuck quest:
                function () {
                    //Test Quest
                    scope.quest.title = "Basic Quest";
                    scope.quest.description = "Do a thing and it won't be your turn, fail and it's still your turn";
                    return scope;
                },

                //Mental one:
                function () {
                    //Test Quest
                    var currentPlayer = Players.getCurrentPlayer();
                    var percentageOfOtherPlayersToBattle = 40;
                    var numberOfOpponents = Math.ceil((Players.properties.players.length -1) * (percentageOfOtherPlayersToBattle / 100));
                    var opponents = Players.getRandomOpponents(numberOfOpponents);
                    var opponentNames = [];
                    for (var i = 0; i < opponents.length; i++){
                        opponentNames.push(opponents[i].name);
                    }

                    var successEffect = {
                        title: "Breath Holder doesn't have to drink",
                        type: "good",
                        turnLength: 2
                    };

                    var failureEffect = {
                        title: "Everyone say 'Awwwww' whenever " + currentPlayer.name + " speaks",
                        type: "good",
                        turnLength: 4
                    };


                    scope.quest.title = "Biggie!";
                    scope.quest.description = "Oh no, " + currentPlayer.name + "!";
                    scope.quest.description += " You've wandered into a tongue monster's cave with";
                    scope.quest.description += " " + opponentNames.join(", ");
                    scope.quest.description +=  " and the monster can hear you breathing.";
                    scope.quest.description +=  " To survive without being brutally licked you'll have to hold your breath the longest.";
                    scope.quest.description +=  " Succeed, then take one drink and be granted awesome powers, fail and take a drink, everyone will feel sorry for you.";
                    scope.quest.successFunction = function () {
                        //Good stuff
                        Players.addEffectToPlayer(currentPlayer, successEffect);

                        //Always do this
                        Game.turn(scope, true);
                    };
                    scope.quest.failureFunction = function () {
                        //Bad stuff
                        Game.addEffectToGame(failureEffect);

                        //Always do this
                        Game.turn(scope, false);
                    };
                    return scope;
                }
            ]
        };

        return this;

    });