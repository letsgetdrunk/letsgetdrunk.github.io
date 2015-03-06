angular.module('drinkingApp')
    .service('Quests', function (Players) {
        var self = this;
        var initialProperties = {
            quests: [],
            decks: []
        };

        var properties = angular.copy(initialProperties);

        var reset = function(){
            properties = angular.copy(initialProperties);
        };

        var loadDecks = function(){

            angular.forEach(properties.decks, function (deck) {
                $http.get('json/' + deck + '.json')
                    .then(function (deckQuests) {
                        properties.quests = properties.quests.concat(deckQuests.data);
                    });
            });

        };

        return {
            reset: self.reset
        };

    });