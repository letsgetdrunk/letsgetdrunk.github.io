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

        this.reset = function() {
            self.properties = angular.copy(initialProperties);
        };

        this.getNextQuest = function (scope) {
            try{
                return self.getQuest(scope);
            }
            catch(e){
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
            scope.game = Game.properties;
            scope.deck = self.properties.currentDeck;
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

        this.enoughQuests = function(){
            return self.properties.activeDecks.length > 0;
        };

        /**
         *
         * Standard Quest Helpers
         *
         */

        helpers.setStandardScopeItems = function(){
            //Any kind of catch-all
        };



        //Decklarations.... get it?

        decks.base = {
            properties: {
                title: "Base"
            },
            quests: [
                function () {
                    //Test Quest
                    scope.quest = {
                        title: "Testing 123"
                    };
                    return scope;
                }
            ]
        };

        return this;

    });