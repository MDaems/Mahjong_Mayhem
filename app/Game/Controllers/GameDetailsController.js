module.exports = function($scope, GameService, $stateParams, $timeout) {
    var self = this;

    self.game = '';
    self.players = '';
    self.tiles = [];
    self.matches = [];
    self.username = window.localStorage['username'];

    self.firstSelectedTile = {};
    self.secondSelectedTile = {};

    self.successMessage = '';
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
                    };
                    self.matches.push(match);
                }
            }, function errorCallback(response) {
            self.errorMessage = response.data.message;
            self.showMessageBox();
        });
    }

    self.getLeft = function(tileobject) {
        var value = (Number(tileobject.xPos) * 73 - (10 * Number(tileobject.zPos)))/2;
        return value + 'px';
    };

    self.getTop = function(tileobject) {
        var value = ((Number(tileobject.yPos) * 90) - (10 * Number(tileobject.zPos)))/2;
        return value + 'px';
    };
    self.selectTile = function(tileObject) {
        if(self.tileCanBeSelected(tileObject)){
            if(self.firstSelectedTile == tileObject ) {
                self.firstSelectedTile = [];
                console.log('first removed');
            } else if(self.secondSelectedTile == tileObject) {
                self.secondSelectedTile = [];
                console.log('second removed');
            } else {
                if(Object.keys(self.firstSelectedTile).length == 0) {
                    self.firstSelectedTile = tileObject;
                    console.log('first set');
                    self.tryMatch();
                } else {
                    self.secondSelectedTile = tileObject;
                    self.tryMatch();
                    console.log('second set');
                }
            }
        }
    };

    self.tryMatch = function() {
        if(Object.keys(self.firstSelectedTile).length != 0 && Object.keys(self.secondSelectedTile).length != 0) {
            if (self.tilesAreAMatch()) {
                    self.showSuccessMessage('Match gevonden!');
                self.match();
            } else {            
                self.showErrorMessage('Geen match!');
            }
            self.firstSelectedTile = [];
            self.secondSelectedTile = [];
        }
    };

    self.showSuccessMessage = function(message) {
        self.successMessage = message;
        self.showMessageBox();
    };

    self.showErrorMessage = function(message) {
        self.errorMessage = message;
        self.showMessageBox();
    };

    self.tileCanBeSelected = function(selectedTile) {
        var returnValue = true;
        if(self.game.state == 'finished') {
            self.showErrorMessage('Er zijn geen matches meer mogelijk');
            return false;
        }
        var x = selectedTile.xPos;
        var y = selectedTile.yPos;
        var z = selectedTile.zPos;
        var surroundedOnLeft = false;
        var surroundedOnRight = false;

        //var noSurroundingTiles = false;
        self.tiles.forEach(function(tileObject){
            if(!tileObject.match && tileObject.zPos >= z && tileObject.yPos >= y - 1 && tileObject.yPos <= y + 1 && tileObject.xPos >= x - 2 && tileObject.xPos <= x + 2 && tileObject._id != selectedTile._id) {
                //Check if surrounded
                if(tileObject.zPos == z) {
                    if (tileObject.xPos == x - 2) {
                        console.log('surrounded on left');
                        if(surroundedOnRight){
                            returnValue = false;
                            self.showErrorMessage('Tegel is horizontaal ingesloten');
                        }
                        surroundedOnLeft = true;
                    }
                    else if(tileObject.xPos == x + 2) {
                        console.log('surrounded on right');
                        if(surroundedOnLeft){
                            returnValue = false;
                            self.showErrorMessage('Tegel is horizontaal ingesloten');
                        }
                        surroundedOnRight = true;
                    }
                }
                //Check has tile on top
                if(tileObject.zPos > z) {
                    if(tileObject.xPos >= x -1 && tileObject.xPos <= x +1) {
                        if(tileObject.yPos >= y -1 && tileObject.yPos <= y + 1) {
                            self.showErrorMessage('Tegel ligt onder een andere tegel');
                            returnValue = false;
                        }
                    }
                }
            }
        });
        return returnValue;
    };

    self.tilesAreAMatch = function() {
		if(self.firstSelectedTile.tile.suit == self.secondSelectedTile.tile.suit){
			if(self.firstSelectedTile.tile.suit == 'Flower' || self.firstSelectedTile.tile.suit == 'Season') {
				return true;
			}
		}
        var nameFirstTile = self.firstSelectedTile.tile.suit + self.firstSelectedTile.tile.name;
        var nameSecondTile = self.secondSelectedTile.tile.suit + self.secondSelectedTile.tile.name;

        return nameFirstTile == nameSecondTile;
    };

    self.match = function() {
    GameService.match($stateParams.id, self.firstSelectedTile._id, self.secondSelectedTile._id)
        .then(function successCallback(response) {
            for(var i = 0; i < self.tiles.length; i ++) {
                if(self.tiles[i]._id == response.data[0]._id || self.tiles[i]._id == response.data[1]._id) {
                    self.tiles.splice(i,1);
                }
            }
        });
    };

    self.isSelected= function(tileId) {
        if(self.firstSelectedTile != undefined) {
            if (tileId == self.firstSelectedTile._id || tileId == self.secondSelectedTile._id) {
                return "Selected"
            }
        }
        return "notSelected";
    };

    self.showMessageBox = function() {
        $timeout(function(){
            self.successMessage = '';
            self.errorMessage = '';
        }, 3000);
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

};