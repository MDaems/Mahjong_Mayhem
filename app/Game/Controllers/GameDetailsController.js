module.exports = function($scope, GameService, $stateParams) {
    var self = this;

    self.game = '';
    self.players = '';
    self.tiles = [];
    self.matches = [];
    self.username = window.localStorage['username'];

    self.succesMessage = '';
    self.errorMessage = '';

    //Game
    GameService.getGameById($stateParams.id)
        .then(function successCallback(response) {
            self.game = response;
            self.players = self.game.players;
        }, function errorCallback(response) {
            self.errorMessage = response.data.message;
            self.showMessageBox();
        });
    
    //Board
    GameService.getGameBoard($stateParams.id)
        .then(function successCallback(response) {
            angular.forEach(response, function(tile) {
                var temp_tile = tile;
                temp_tile.left = self.getLeft(tile);
                temp_tile.top = self.getTop(tile);
                self.tiles.push(temp_tile);
            });
            //Matches
            self.matchedTiles = [];
            self.tiles.filter(function (tile) {
                    if ('match' in tile) {
                        self.matchedTiles.push(tile);
                    }
                });

                for(var i = 0; i < self.matchedTiles.length; i+=2){
                    var match = {
                        "tile1":self.matchedTiles[i].tile,
                        "tile2":self.matchedTiles[i+1].tile,
                        "player":self.matchedTiles[i].match
                    }
                    self.matches.push(match);
                }
                //console.log(self.matches);


    }, function errorCallback(response) {
            self.errorMessage = response.data.message;
            self.showMessageBox();
        });


    self.getLeft = function(tileobject) {
        var value = (Number(tileobject.xPos) * 73 + 10 * Number(tileobject.zPos))/2;
        return value + 'px';
    };

    self.getTop = function(tileobject) {
        var value = ((Number(tileobject.yPos) * 90) + (10 * Number(tileobject.zPos)))/2;
        return value + 'px';
    };


    /*//Matches
    GameService.getMatchedTiles($stateParams.id)
        .then(function successCallback(response) {
            for(var i = 0; i < response.length; i+=2){
                var match = {
                    "tile1":response[i].tile,
                    "tile2":response[i+1].tile,
                    "player":response[i].match
                }
                self.matches.push(match);
            }
        }, function errorCallback(response) {

        });*/

}