module.exports = function($scope, $http, GameFactory, $routeParams) {

    var self = this;


    self.GameFactory = GameFactory;

	self.me = {};// {__v: 0, _id: 'rasseldo@avans.nl', name: 'Ron van Asseldonk'};

	console.log($routeParams);


    $http({
        method: 'GET',
        url: 'http://mahjongmayhem.herokuapp.com/Games'
    }).then(function successCallback(response) {
        angular.forEach(response.data, function(game) {

			self.GameFactory.addGame(game);
        });
    }, function errorCallback(response) {
    });

	self.isLoggedIn = function()
	{
		return self.me.name != undefined;
	};

	self.canJoin = function(game) {
		if(game.state != 'open' || game.maxPlayers <= game.players.length) {
			return false;
		}
		else {
			if(game.players.length > 0) {
				for(var i = 0; i < game.players.length; i ++) {
					if(game.players[i]._id == self.me._id) {
						return false;
					}
				}
			}
			return true;
		}
	};

	self.allowedToSeeTiles = function(game)
	{
		return game.state != 'open';
	};

	self.join = function(game) {
		//$http({
		//	method: 'POST',
		//	url: 'http://mahjongmayhem.herokuapp.com/Games/' + game._id + '/Players'
		//}).then(function successCallback(response) {
		//	self.GameFactory.join(game, self.me);
		//},function errorCallback(response) {
		//});
		//TODO:: na het inloggen moet de onderstaande regel vervangen worden door ^ deze code
		self.GameFactory.join(game, self.me);
	};

	self.getTiles = function(game) {
		$http({
			method: 'GET',
			url: 'https://mahjongmayhem.herokuapp.com/games/' + game.id + '/tiles'
		}).then(function successCallback(response) {
			angular.forEach(response.data, function(tile) {

				self.GameFactory.addTile(tile);
			});
		}, function errorCallback(response) {
		});
	}

};
