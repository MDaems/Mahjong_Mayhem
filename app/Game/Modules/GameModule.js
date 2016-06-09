var gameModule = angular.module('mahjong.game', []);

//var gameModel = require('../Models/Game');
var gameFactory = require('../Factories/GameFactory');
var gameService = require('../Services/GameService');
var gameController = require('../Controllers/GameController');
var gameDetailsController = require('../Controllers/GameDetailsController');
var gameRoute = require("../Routes/routes");

//gameModule.factory('GameModel', gameModel);
gameModule.factory('GameFactory', gameFactory);
gameModule.factory('GameService', ['$http', gameService]);
gameModule.controller('GameController', gameController);
gameModule.controller('GameDetailsController', gameDetailsController);
gameModule.config(gameRoute);


module.exports = gameModule;