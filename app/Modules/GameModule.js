require("angular/angular");

var gameModule = angular.module('mahjong.game', []);

var gameFactory = require('../Factories/GameFactory');
var gameService = require('../Services/GameService');
var gameController = require('../Controllers/GameController');

gameModule.factory('GameFactory', gameFactory);
gameModule.factory('GameService', ['$http', gameService]);
gameModule.controller('GameController', gameController);

module.exports = gameModule;