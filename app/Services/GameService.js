module.exports = function($http){
	var urlBase = "http://mahjongmayhem.herokuapp.com"
	var service = {};

	service.getGames = function () {
        return $http({
            method: 'GET',
            url: urlBase+'/Games'
        }).then(function(response) {
            return response.data;
        });
    };

    service.addGame = function (game) {
        return $http({
            method: 'POST',
            url: urlBase+'/Games/',
            data: game,
            dataType: "json",
        }).then(function successCallback(response) {
            return response.data;
        });
    };

    service.joinGame = function (game) {
        return $http({
            method: 'POST',
            url: urlBase+'/Games/' + game.id + '/Players',
        }).then(function successCallback(response) {
            return response.data;
        });
    };

    service.getGameBoard = function (game) {
        return $http({
            method: 'GET',
            url: urlBase+'/games/' + game.id + '/tiles'
        }).then(function successCallback(response) {
            return response.data;
        });
    };

    service.getMatchedTiles = function (game) {
        return $http({
            method: 'GET',
            url: urlBase+'/Games/' + game.id + '/Tiles/matches',
        }).then(function successCallback(response) {
            return response.data;
        });
    };


	return service;
};