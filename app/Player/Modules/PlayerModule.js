var playerModule = angular.module('mahjong.player', []);

var playerController = require('../Controllers/PlayerController');
var playerRoute = require("../Routes/routes");

playerModule.controller('PlayerController',  playerController);
playerModule.config(playerRoute);

module.exports = playerModule;