var Game = require('../Models/Game');

module.exports = function($scope, $http, $timeout, GameService, GameFactory){//}, $routeParams) {

    var self = this;
	self.games = [];
	self.currentUser = window.localStorage['username'];
	self.succesMessage = '';
	self.errorMessage = '';

	getGames();

	function getGames(){
		self.games= [];
		GameService.getGames()
			.then(function successCallback(response) {
				angular.forEach(response, function(game) {
					self.games.push(new Game(game));
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


	self.canJoinGame = function(game) {

		if(game.createdBy._id == self.currentUser || game.state != 'open' || game.maxPlayers <= game.players.length) {
			return false;
		}
		else {
			if(game.players.length > 0) {
				for(var i = 0; i < game.players.length; i ++) {
					if(game.players[i]._id == self.currentUser) {
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
				//getGames();
			self.showMessageBox();
		},function errorCallback(err) {
			self.errorMessage = err.statusText;
			self.showMessageBox();
		});
	};

    self.canStartGame = function(game) {
        if(game.createdBy._id == window.localStorage['username'] && game.players.length >= game.minPlayers && game.state == "open") {
            return true;
        }
        return false;
    };

    self.startGame = function(game){
        GameService.startGame(game).then(function(response){
            self.succesMessage = "Game has started!";
        }, function(err){
            self.errorMessage = err.data.message;
        });
    }
	self.showMessageBox = function()
	{
		$timeout(function(){
			self.succesMessage = '';
			self.errorMessage = '';
		}, 3000);
	};
};
