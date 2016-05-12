module.exports = function($scope, $http, GameFactory) {

    var self = this;


    self.GameFactory = GameFactory;


    $http({
        method: 'GET',
        url: 'http://mahjongmayhem.herokuapp.com/Games'
    }).then(function successCallback(response) {
        angular.forEach(response.data, function(game, index) {

            self.GameFactory.addGame(game._id, game.state);
            //console.log(game._id);
        });
    }, function errorCallback(response) {
    });

    this.msg = "hello world";


};
