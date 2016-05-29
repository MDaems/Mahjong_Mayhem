module.exports = function($scope, $http, $timeout, GameFactory){//}, $routeParams) {

    var self = this;
    self.GameFactory = GameFactory;
	self.me = {};
	self.selectedGame = null;

	self.succesMessage = '';
	self.errorMessage = '';

    $http({
        method: 'GET',
        url: 'http://mahjongmayhem.herokuapp.com/Games'
    }).then(function successCallback(response) {
        angular.forEach(response.data, function(game) {

			self.GameFactory.addGame(game);
        });
    }, function errorCallback(response) {
    });

	self.addGame = function(game){
		$http({
			method: 'POST',
			url: 'http://mahjongmayhem.herokuapp.com/Games/',
			data: game,
			dataType: "json",
		}).then(function successCallback(response) {
			self.succesMessage = 'Successfully added game';
			self.showMessageBox();
		},function errorCallback(err) {
			self.errorMessage = err.statusText;
			self.showMessageBox();
		});
	}

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
			console.log(response);
			self.succesMessage = 'Successfully joined game';
			self.showMessageBox();
		},function errorCallback(err) {
			self.errorMessage = err.statusText;
			self.showMessageBox();
		});
	};



	self.allowedToSeeGame = function(game)
	{
		return game.state != 'open';
	};

	self.getGameDetails = function(game) {
		console.log('Open Game');
		self.GameFactory.tiles= [];
		$http({
			method: 'GET',
			url: 'https://mahjongmayhem.herokuapp.com/games/' + game.id + '/tiles'
		}).then(function successCallback(response) {
			angular.forEach(response.data, function(tile) {
				var temp_tile = tile;
				temp_tile.left = self.getLeft(tile);
				temp_tile.top = self.getTop(tile);
				self.GameFactory.addTile(temp_tile);
			});
		}, function errorCallback(response) {
			self.errorMessage = response.data.message;
			self.showMessageBox();
		});

		self.getMatchedTiles(game);
	};

	self.getLeft = function(tileobject) {
		var value = (Number(tileobject.xPos) * 73 + 10 * Number(tileobject.zPos))/2;
		return value + 'px';
	};

	self.getTop = function(tileobject) {
		var value = ((Number(tileobject.yPos) * 90) + (10 * Number(tileobject.zPos)))/2;
		return value + 'px';
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

	self.setSelected = function(game) {
		selectedGame = game;
	}

	self.getPlayersInGame = function() {
		return selectedGame.players;
	}

	self.showMessageBox = function()
	{
		self.showMessage = true;
		$timeout(function(){
			self.succesMessage = '';
			self.errorMessage = '';
		}, 3000);
	};
};
