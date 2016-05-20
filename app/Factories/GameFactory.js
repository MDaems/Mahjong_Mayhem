// GamesFactory.js
module.exports = function() {
    var factory = {};

    factory.games = [];

	factory.tiles = [];

	factory.addGame = function(game) {
		factory.games.push({id: game._id, minPlayers: game.minPlayers, maxPlayers: game.maxPlayers, players: game.players, state: game.state});
	};

	factory.addTile = function(tile) {
		factory.tiles.push(tile);
	};

	factory.join = function(game, player) {
		factory.games[factory.games.indexOf(game)].players.push(player);
	};

return factory;
};