angular.module('drinkingApp')
    .service('Quests', function (Players, Game, Decks) {
        var self = this;
        var initialProperties = {
            currentQuestIndex: undefined
        };

        var properties = angular.copy(initialProperties);

        var reset = function() {
            properties = angular.copy(initialProperties);
        };

        var getNextQuest = function (scope) {
            try{
                return Decks.getQuest(scope);
            }
            catch(e){
                //Oops
                console.log("Quest threw exception");
                console.log(e);
                properties.quests.splice(questIndex, 1);
                return getNextQuest(scope);
            }
        };

        return this;

    });