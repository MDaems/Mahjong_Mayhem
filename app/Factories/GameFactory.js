// GamesFactory.js
module.exports = function() {
    var factory = {};

    factory.games = [
        {id: '1', minPlayers: 2, maxPlayers: 5, players: [], state: 'active'},
        {id: '2', minPlayers: 2, maxPlayers: 5, players: [], state: 'active'},
        {id: '3', minPlayers: 2, maxPlayers: 5, players: [], state: 'active'}
    ];

	factory.addGame = function(game) {
		factory.games.push({id: game._id, minPlayers: game.minPlayers, maxPlayers: game.maxPlayers, players: game.players, state: game.state});
	};

	factory.join = function(game, player) {
		factory.games[factory.games.indexOf(game)].players.push(player);
	};

return factory;
};