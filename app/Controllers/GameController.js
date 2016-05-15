module.exports = function($scope, $http, GameFactory) {

    var self = this;


    self.GameFactory = GameFactory;

	self.me = {__v: 0, _id: 'rasseldo@avans.nl', name: 'Ron van Asseldonk'};


    $http({
        method: 'GET',
        url: 'http://mahjongmayhem.herokuapp.com/Games'
    }).then(function successCallback(response) {
        angular.forEach(response.data, function(game, index) {

			self.GameFactory.addGame(game);
        });
    }, function errorCallback(response) {
    });

	self.canJoin = function(game) {
		if(game.state != 'open') {
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

    this.msg = "hello world";

};
