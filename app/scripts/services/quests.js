angular.module('drinkingApp')
    .service('Quests', function (Players, Game, Decks) {
        var self = this;
        var scope;
        var deckNames = [
            'base'
        ];
        var decks;
        var helpers = {};
        var initialProperties = {
            currentQuest: undefined,
            currentDeck: undefined,
            activeDecks: []
        };


        var properties = angular.copy(initialProperties);

        var reset = function() {
            properties = angular.copy(initialProperties);
        };

        var getNextQuest = function (scope) {
            try{
                return getQuest(scope);
            }
            catch(e){
                //Oops
                console.log("Quest threw exception");
                console.log(e);
                properties.quests.splice(questIndex, 1);
                return getNextQuest(scope);
            }
        };

        var self = this;

        var getQuest = function (theScope) {
            scope = theScope;
            properties.currentQuest = getRandomQuestObject;
            properties.currentDeck = questObject.deck;
            scope.game = Game.properties;
            scope.deck = properties.currentDeck;
            return questObject.runFunction();
        };

        var getRandomQuestObject = function () {
            var totalQuests = 0;
            for (var i = 0; i < properties.activeDecks.length; i++) {
                totalQuests += properties.activeDecks[i].quests.length;
            }
            var questIndex = Math.floor(Math.random() * totalQuests);
            var lowestIndex = 0;
            var highestIndex = -1;
            for (var x = 0; x < properties.activeDecks.length; x++) {
                highestIndex += (properties.activeDecks[x].length);
                if (highestIndex >= questIndex) {
                    var deckIndex = (questIndex - lowestIndex);
                    return {
                        deck: properties.activeDecks[x].properties,
                        runFunction: properties.activeDecks[x].quests[deckIndex]
                    };
                }
                lowestIndex = highestIndex;
            }
            console.log("Random Quest selection failed!?");
        };

        var addDeck = function (deckName) {
            properties.activeDecks = properties.activeDecks.concat(decks[deckName]);
        };

        var enoughQuests = function(){
            return properties.activeDecks.length > 0;
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
                    alert(self.scope);
                    return self.scope;
                }
            ]
        };

        return this;

    });