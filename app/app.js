require("angular/angular");

// Create your app
var app = angular.module('mahjong', []);

var gameFactory = require('./Factories/GameFactory');
var gameController = require('./Controllers/GameController');

app.factory('GameFactory', gameFactory);
app.controller('GameController',  gameController);


//app.controller()
