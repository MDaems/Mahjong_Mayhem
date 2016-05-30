// GamesFactory.js
module.exports = function() {
    var factory = {};

    factory.games = [];
	factory.tiles = [];
	factory.matches = [];
	factory.players = [];

	factory.addGame = function(game) {
		factory.games.push({
			id: game._id,
			minPlayers: game.minPlayers,
			maxPlayers: game.maxPlayers,
			players: game.players,
			state: game.state,
			createdBy: game.createdBy});
	};

	factory.addTile = function(tile) {
		factory.tiles.push(tile);
	};

	factory.addMatch = function(match) {
		factory.matches.push(match);
	};

	factory.join = function(game, player) {
		factory.games[factory.games.indexOf(game)].players.push(player);
	};

return factory;
};