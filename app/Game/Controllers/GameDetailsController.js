module.exports = function($scope, GameService, $stateParams, $timeout, GameSocket) {
    var self = this;

    self.game = '';
    self.players = '';
    self.tiles = [];
    self.matches = [];
    self.username = window.localStorage['username'];
    self.chosenTemplate = 'Default';

    self.firstSelectedTile = {};
    self.secondSelectedTile = {};

    self.successMessage = '';
    self.errorMessage = '';
    getGameDetails();

    GameSocket.connect($stateParams.id);

    GameSocket.match(function(data){
        self.removeMatchedTiles(data)
    });
    GameSocket.endGame(function(data){
        console.log('game finished');
        game.state == 'finished';
    });

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

	self.getSprites = function() {
		if(self.chosenTemplate == 'Dinosaurs') {
			console.log('dinosaurs');
			return './css/epicDinosaurSprites.css';
		}
		console.log('old');
		return './css/sprites_old.css';
	};

	self.changeTemplate = function() {
		if(self.chosenTemplate == 'Dinosaurs') {
			self.chosenTemplate = 'Default';
		} else {
			self.chosenTemplate = 'Dinosaurs';
		}
	};

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
            } else if(self.secondSelectedTile == tileObject) {
                self.secondSelectedTile = [];
            } else {
                if(Object.keys(self.firstSelectedTile).length == 0) {
                    self.firstSelectedTile = tileObject;
                    self.tryMatch();
                } else {
                    self.secondSelectedTile = tileObject;
                    self.tryMatch();
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
                        if(surroundedOnRight){
                            returnValue = false;
                            self.showErrorMessage('Tegel is horizontaal ingesloten');
                        }
                        surroundedOnLeft = true;
                    }
                    else if(tileObject.xPos == x + 2) {
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
            //self.removeMatchedTiles(response.data);
        });
    };

    self.removeMatchedTiles = function(data) {
        for(var i = 0; i < self.tiles.length; i ++) {
            if(self.tiles[i]._id == data[0]._id || self.tiles[i]._id == data[1]._id) {
                self.tiles.splice(i,1);
            };
        }
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