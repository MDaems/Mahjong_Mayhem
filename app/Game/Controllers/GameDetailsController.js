module.exports = function($scope, GameService, $stateParams) {
    var self = this;

    self.game = '';
    self.players = '';
    self.tiles = [];
    self.matches = [];
    self.username = window.localStorage['username'];

    self.firstSelectedTile = {};
    self.secondSelectedTile = {};

    self.succesMessage = '';
    self.errorMessage = '';
    getGameDetails();

    function getGameDetails() {
        self.tiles = [];
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
            }, function errorCallback(response) {
            self.errorMessage = response.data.message;
            self.showMessageBox();
        });
    };

    self.getLeft = function(tileobject) {
        var value = (Number(tileobject.xPos) * 73 - (10 * Number(tileobject.zPos)))/2;
        return value + 'px';
    };

    self.getTop = function(tileobject) {
        var value = ((Number(tileobject.yPos) * 90) - (10 * Number(tileobject.zPos)))/2;
        return value + 'px';
    };

    self.showMessageBox = function() {
        $timeout(function(){
            self.succesMessage = '';
            self.errorMessage = '';
        }, 3000);
    };

    self.selectTile = function(tileObject) {
        if (self.tileCanBeSelected(tileObject.xPos, tileObject.yPos, tileObject.zPos)) {
            if (tileObject == self.firstSelectedTile) {
                self.firstSelectedTile = {};
                console.log('first selected tile cleared');
            } else if (tileObject == self.secondSelectedTile) {
                self.secondSelectedTile = {};
                console.log('second selected tile cleared');
            }
            else {
                if (Object.keys(self.firstSelectedTile).length != 0) {
                    self.secondSelectedTile = tileObject;
                    if(self.tilesAreAMatch()){
                        console.log('These tiles are a match!');
                        self.match();
                    } else {
                        var nameFirstTile = self.firstSelectedTile.tile.suit + self.firstSelectedTile.tile.name;
                        var nameSecondTile = self.secondSelectedTile.tile.suit + self.secondSelectedTile.tile.name;

                        console.log('Not a match: ' + nameFirstTile + ' and ' + nameSecondTile);
                    }
                    console.log('second selected tile set');
                } else {
                    self.firstSelectedTile = tileObject;
                    console.log('first selected tile set');
                }
            }
        }
        else {
            console.log('Tile cannot be selected top:' + self.tileHasTilesOnTop(tileObject.xPos, tileObject.yPos, tileObject.zPos) + ' surrounded: ' + self.tileIsSurrounded(tileObject.xPos, tileObject.yPos, tileObject.zPos));
        }
    };

    self.tileCanBeSelected = function(x,y,z) {
        return !self.tileHasTilesOnTop(x,y,z) && !self.tileIsSurrounded(x,y,z);
    };

    self.tileHasTilesOnTop = function(x,y,z) {
        var tilesInRow = self.getTilesByYValue(y);
        var hasTilesOnTop = false;
        for(var i = x -1; i <= x + 1; i ++) {
            tilesInRow.forEach(function(tileObject){
                if(tileObject.xPos == i && tileObject.zPos > z) {
                    hasTilesOnTop = true;
                }
            });
        }
        return hasTilesOnTop;
    };

    self.tileIsSurrounded = function(x, y, z) {

        var tiles = self.getSurroundingTilesForRows(x,y);
        console.log('Tiles', tiles);

        var surroundedOnLeft = false;
        var surroundedOnRight = false;
        tiles.forEach(function(tileObject){
            if(surroundedOnLeft && surroundedOnRight) {
                return true;
            }
            if(tileObject.xPos == x - 2) {
                surroundedOnLeft = true;
            } else if (tileObject.xPos == x + 2) {
                surroundedOnRight = true;
            }
        });
        return surroundedOnLeft && surroundedOnRight;
    };

    self.getSurroundingTilesForRows = function(y,z) {
        var tilesInRowAboveOnSameLevel = self.getTilesByYAndZValue(y + 1, z);
        var tilesInRowOnSameLevel = self.getTilesByYAndZValue(y,z);
        var tilesInRowBelowOnSameLevel = self.getTilesByYAndZValue(y - 1, z);

        return tilesInRowAboveOnSameLevel.concat(tilesInRowOnSameLevel, tilesInRowBelowOnSameLevel);
    };

    self.getTilesByYValue = function(y) {
        var temp_tileArray = [];
        self.tiles.forEach(function(tileObject) {
            if(tileObject.yPos == y) {
                temp_tileArray.push(tileObject);
            }
        });
        return temp_tileArray;
    };

    self.getTilesByYAndZValue = function(y,z) {
        var temp_tileArray = [];
        self.tiles.forEach(function(tileObject){
            if(tileObject.yPos == y && tileObject.zPos == z) {
                temp_tileArray.push(tileObject);
            }
        });
        return temp_tileArray;

    };

    self.tilesAreAMatch = function() {
        var nameFirstTile = self.firstSelectedTile.tile.suit + self.firstSelectedTile.tile.name;
        var nameSecondTile = self.secondSelectedTile.tile.suit + self.secondSelectedTile.tile.name;

        return nameFirstTile == nameSecondTile;
    };

    self.match = function() {

        GameService.match($stateParams.id, self.firstSelectedTile._id, self.secondSelectedTile._id)
            .then(function successCallback(response) {
                getGameDetails();
            })

        self.firstSelectedTile = {};
        self.secondSelectedTile = {};
    }


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