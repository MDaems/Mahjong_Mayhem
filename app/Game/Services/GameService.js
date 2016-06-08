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

    service.getGameById = function(id){
        return $http({
            method: 'GET',
            url: urlBase+'/Games/' + id,
        }).then(function successCallback(response) {
            return response.data;
        });
    }

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
            url: urlBase+'/Games/' + game._id + '/Players',
        }).then(function successCallback(response) {
            return response.data;
        });
    };

    service.startGame = function(game){
        return $http({
            method: 'POST',
            url: urlBase+'/Games/' + game._id + '/Start',
        }).then(function successCallback(response) {
            return response.data;
        });
    }

    service.getGameBoard = function (id) {
        return $http({
            method: 'GET',
            url: urlBase+'/games/' + id + '/tiles'
        }).then(function successCallback(response) {
            return response.data;
        });
    };

   /* service.getMatchedTiles = function (id) {
        console.log(id);
        return $http({
            method: 'GET',
            url: urlBase+'/Games/' + id + '/Tiles/matches',
        }).then(function successCallback(response) {
            return response.data;
        });
    };*/
    
	return service;
};