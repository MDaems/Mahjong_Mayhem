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

    self.showMessageBox = function() {
        $timeout(function(){
            self.succesMessage = '';
            self.errorMessage = '';
        }, 3000);
    };

	self.selectTile = function(tileObject) {
		if(self.tileCanBeSelected(tileObject)){
			if(self.firstSelectedTile == tileObject ) {
				self.firstSelectedTile = [];
			} else if(self.secondSelectedTile == tileObject) {
				self.secondSelectedTile = [];
			} else {
				if(Object.keys(self.firstSelectedTile).length != 0) {
					self.secondSelectedTile = tileObject;
					if(self.tilesAreAMatch()) {
						self.match();
					}
					self.firstSelectedTile = [];
					self.secondSelectedTile = [];
				} else {
                    self.firstSelectedTile = tileObject;
                }
			}
		}
	};

	self.tileCanBeSelected = function(selectedTile) {
		var x = selectedTile.xPos;
		var y = selectedTile.yPos;
		var z = selectedTile.zPos;
		var surroundedOnLeft = false;
		var surroundedOnRight = false;
		self.tiles.forEach(function(tileObject){
			if(!tileObject.match && tileObject.zPos >= z && tileObject.yPos >= y - 1 && tileObject.yPos <= y + 1 && tileObject.xPos >= x - 2 && tileObject.xPos <= x + 2 && tileObject._id != selectedTile._id) {
				//Check if surrounded
				if(tileObject.zPos == z) {
					if (tileObject.xPos == x - 2) {
						if(surroundedOnRight){
							return false;
						}
						surroundedOnLeft = true;
					}
					else if(tileObject.xPos == x + 2) {
						if(surroundedOnLeft){
							return false;
						}
						surroundedOnRight = true;
					}
				}
				//Check has tile on top
				if(tileObject.zPos > z) {
					if(tileObject.xPos >= x -1 && tileObject.xPos <= x +1) {
						if(tileObject.yPos >= y -1 && tileObject.yPos <= y + 1) {
							return false;
						}
					}
				}
			}
		});
        return true;
	};

    self.tilesAreAMatch = function() {
        var nameFirstTile = self.firstSelectedTile.tile.suit + self.firstSelectedTile.tile.name;
        var nameSecondTile = self.secondSelectedTile.tile.suit + self.secondSelectedTile.tile.name;

        return nameFirstTile == nameSecondTile;
    };

    self.match = function() {
        GameService.match($stateParams.id, self.firstSelectedTile._id, self.secondSelectedTile._id)
            .then(function successCallback(response) {
           /*     angular.forEach(self.tiles, function(tile)
                {
                    if(tile._id == response.data[0]._id) {
                        var index =  self.tiles.indexOf(tile);

                    }
                });*/

                for(var i = 0; i < self.tiles.length; i ++) {
                    if(self.tiles[i]._id == response.data[0]._id || self.tiles[i]._id == response.data[1]._id) {
                        self.tiles.splice(i,1);
                    }
                }

               /* var index1 =  self.tiles.indexOf(response.data[0]);
                self.tiles.splice(index1,1);
                var index2 =  self.tiles.indexOf(response.data[1]);
                self.tiles.splice(index1,1);*/
            });
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