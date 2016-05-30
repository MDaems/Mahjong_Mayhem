require("angular/angular");

var playerModule = angular.module('mahjong.player', []);

var playerController = require('../Controllers/PlayerController');
playerModule.controller('PlayerController',  playerController);

module.exports = playerModule;