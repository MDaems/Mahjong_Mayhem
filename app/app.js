require("angular/angular");
require('angular-ui-router');

// Create your app
var app = angular.module('Mahjong', ['ui.router']);

var gameFactory = require('./Factories/GameFactory');
app.factory('GameFactory', gameFactory);
var gameController = require('./Controllers/GameController');
app.controller('GameController',  gameController);

var playerController = require('./Controllers/PlayerController');
app.controller('PlayerController',  playerController);

var authService = require("./Services/AuthService");

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

app.config(function ($httpProvider) {
    $httpProvider.interceptors.push('AuthService');
});