module.exports = function($scope, $http, $timeout, GameService, GameFactory){//}, $routeParams) {

    var self = this;
    self.GameFactory = GameFactory;
	self.me = {};
	self.selectedGame = null;

	self.succesMessage = '';
	self.errorMessage = '';

	self.tabData   = [
		{
			heading: 'Board',
			route:   'game.board'
		},
		{
			heading: 'Details',
			route:   'game.gamePlayers',
			disable: true
		}
	];

	getGames();
	function getGames(){
		GameService.getGames()
			.then(function successCallback(response) {
				angular.forEach(response, function(game) {
					self.GameFactory.addGame(game);
				});
			}, function errorCallback(err) {
				self.errorMessage = err.statusText;
				self.showMessageBox();
			});
	}

	self.addGame = function(game){
		GameService.addGame(game)
			.then(function successCallback(response) {
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

	self.joinGame = function(game) {
		GameService.joinGame(game)
			.then(function successCallback(response) {
			self.succesMessage = 'Successfully joined game';
			self.showMessageBox();
		},function errorCallback(err) {
			self.errorMessage = err.statusText;
			self.showMessageBox();
		});
	};

	self.getGameDetails = function(game) {
		self.GameFactory.tiles= [];
		GameService.getGameDetails(game)
			.then(function successCallback(response) {
			angular.forEach(response, function(tile) {
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

	self.getMatchedTiles = function(game){
		self.GameFactory.matches= [];
		GameService.getMatchedTiles(game)
			.then(function successCallback(response) {
			angular.forEach(response, function(row) {
				var match = {
					"tile":row.tile,
					"player":row.match
				}
				self.GameFactory.addMatch(match);
			});
		}, function errorCallback(response) {
		});
	}

	self.getLeft = function(tileobject) {
		var value = (Number(tileobject.xPos) * 73 + 10 * Number(tileobject.zPos))/2;
		return value + 'px';
	};

	self.getTop = function(tileobject) {
		var value = ((Number(tileobject.yPos) * 90) + (10 * Number(tileobject.zPos)))/2;
		return value + 'px';
	};

	self.setSelected = function(game) {
		selectedGame = game;
	}

	self.getPlayersInGame = function() {
		return selectedGame.players;
	}

	self.showMessageBox = function()
	{
		$timeout(function(){
			self.succesMessage = '';
			self.errorMessage = '';
		}, 3000);
	};
};
