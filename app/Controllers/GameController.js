module.exports = function($scope, $http, GameFactory){//}, $routeParams) {

    var self = this;
    self.GameFactory = GameFactory;
	self.me = {};

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
			url: 'http://mahjongmayhem.herokuapp.com/Games/' + game.id + '/Players',
			}).then(function successCallback(response) {
			console.log(response.data);
			//self.GameFactory.join(game, self.me);
		},function errorCallback(response) {
		});
	};

	self.allowedToSeeTiles = function(game)
	{
		return game.state != 'open';
	};

	self.getTiles = function(game) {
		self.GameFactory.tiles= [];
		$http({
			method: 'GET',
			url: 'https://mahjongmayhem.herokuapp.com/games/' + game.id + '/tiles'
		}).then(function successCallback(response) {
			angular.forEach(response.data, function(tile) {

				self.GameFactory.addTile(tile);
			});
		}, function errorCallback(response) {
		});

		self.getMatchedTiles(game);
	};

	self.getMatchedTiles = function(game){
		self.GameFactory.matches= [];
		$http({
			method: 'GET',
			url: 'http://mahjongmayhem.herokuapp.com/Games/' + game.id + '/Tiles/matches',
		}).then(function successCallback(response) {
			angular.forEach(response.data, function(row) {
				var match = {
					"tile":row.tile,
					"player":row.match
				}
				self.GameFactory.addMatch(match);
			});
		}, function errorCallback(response) {
		});
	}

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
