require("angular/angular");
require('angular-ui-router');

// Create your app
var app = angular.module('Mahjong', ['ui.router']);

var gameFactory = require('./Factories/GameFactory');
var gameController = require('./Controllers/GameController');

app.factory('GameFactory', gameFactory);
app.controller('GameController',  gameController);


app.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');
    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: './Views/test.html'
        })

        .state('games', {
            url: '/games',
            templateUrl: './Views/games.html',
            controller: 'GameController as gc'
        })
});