module.exports = function($scope, $http, GameFactory){//}, $routeParams) {

    var self = this;


    self.GameFactory = GameFactory;

	self.me = {};

	//console.log($routeParams);


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

	self.join = function(game) {
		$http({
			method: 'POST',
			url: 'http://mahjongmayhem.herokuapp.com/Games/' + game._id + '/Players',
			headers: {'token': window.localStorage['token'], 'username': window.localStorage['username']}
		}).then(function successCallback(response) {
			self.GameFactory.join(game, self.me);
		},function errorCallback(response) {
		});


		//TODO:: na het inloggen moet de onderstaande regel vervangen worden door ^ deze code
		//console.log(window.localStorage['token']);
		//self.GameFactory.join(game, self.me);
	};

	self.allowedToSeeTiles = function(game)
	{
		return game.state != 'open';
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
	};

	self.getMaxRow = function() {
		var maxRow = [];
		for(var i = 0; i < self.GameFactory.tiles.length; i++)
		{
			if(maxRow != undefined)
			{
				maxRow.push(Number(self.GameFactory.tiles[i].xPos));
			}
		}
		maxRow.sort(function(a,b){return a - b});

		return maxRow;
	};

	self.getColumns = function()
	{
		var maxColumn = [];
		for(var i = 0; i < self.GameFactory.tiles.length; i++)
		{
			if(maxColumn.indexOf(self.GameFactory.tiles[i].yPos) == -1)
			{
				maxColumn.push(Number(self.GameFactory.tiles[i].yPos));
			}
		}
		maxColumn.sort(function(a,b){return a - b});

		return maxColumn;

	}

};
