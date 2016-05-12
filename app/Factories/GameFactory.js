// GamesFactory.js
module.exports = function() {
    var factory = {};

    factory.games = [
        {id: '1', status: 'active'},
        {id: '2', status: 'active'},
        {id: '3', status: 'active'}
    ];

    factory.addGame = function(id, status){
        factory.games.push({id: id, status: status});
    };

return factory;
};