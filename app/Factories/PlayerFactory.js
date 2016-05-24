// GamesFactory.js
module.exports = function() {
    var factory = {};

    factory.users = [];

	factory.addUser = function(user) {
		factory.games.push({id: user._id, username: user.username});
	};

return factory;
};