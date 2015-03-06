angular.module('drinkingApp')
    .service('Decks', function (Game, Players, $injector) {
        var self = this;
        var scope;
        var deckNames = [
            'base'
        ];
        var activeDecks = [];
        var decks;
        var currentDeck;

        var getQuest = function (theScope) {
            scope = theScope;
            var questObject = getRandomQuestObject;
            currentDeck = questObject.deck;
            return questObject.runFunction();


        };

        var getRandomQuestObject = function () {
            var totalQuests = 0;
            for (var i = 0; i < activeDecks.length; i++) {
                totalQuests += activeDecks[i].quests.length;
            }
            var questIndex = Math.floor(Math.random() * totalQuests);
            var lowestIndex = 0;
            var highestIndex = -1;
            for (var x = 0; x < activeDecks.length; x++) {
                highestIndex += (activeDecks[x].length);
                if (highestIndex >= questIndex) {
                    var deckIndex = (questIndex - lowestIndex);
                    return {
                        deck: activeDecks[x].properties,
                        runFunction: activeDecks[x].quests[deckIndex]
                    };
                }
                lowestIndex = highestIndex;
            }
            console.log("Random Quest selection failed!?");
        };

        var addDeck = function (deckName) {
            activeDecks = activeDecks.concat(decks[deckName]);
        };



        //Decklarations.... get it?

        decks.base = {
            properties: {
                title: "Base"
            },
            quests: [
                function () {
                    alert(self.scope);
                    return self.scope;
                }
            ]
        };

        return this;

    })
;