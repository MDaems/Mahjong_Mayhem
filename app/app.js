require("angular/angular");
require('angular-ui-router');

// Create your app
var app = angular.module('Mahjong', ['ui.router']);

var gameFactory = require('./Factories/GameFactory');
var gameController = require('./Controllers/GameController');

var playerController = require('./Controllers/PlayerController');

app.factory('GameFactory', gameFactory);
app.controller('GameController',  gameController);

app.controller('PlayerController',  playerController);


app.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');
    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: './Views/test.html'
        })

        .state('authcallback', {
            url: '/authcallback?:username&:token',
            templateUrl : './Views/player.html',
            controller  : 'PlayerController as pCtrl'
        })

        .state('games', {
            url: '/games',
            templateUrl: './Views/games.html',
            controller: 'GameController as gc'
        })

        .state('board', {
            url: '/board',
            templateUrl: './Views/board.html',
            controller: 'GameController as gc'
        })
});