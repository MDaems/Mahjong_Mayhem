var app = angular.module('Mahjong', ['ui.router',  'mahjong.game', 'mahjong.player', 'mahjong.home']);
app.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');
    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: './Views/home.html'
        })

        .state('authcallback', {
            url: '/authcallback?:username&:token',
            templateUrl : './Views/player.html',
            controller  : 'PlayerController as pCtrl'
        })

        .state('profile', {
            url: '/profile',
            templateUrl: './Views/player.html',
            controller  : 'PlayerController as pCtrl'
        })

        .state('createGame', {
            url: '/createGame',
            templateUrl: './Views/createGame.html',
            controller: 'GameController as gc'
        })

        .state('games', {
            url: '/games',
            templateUrl: './Views/games.html',
            controller: 'GameController as gc'
        })

        .state('gamePlayers', {
            url: '/gamePlayers',
            templateUrl: './Views/gamePlayers.html',
            controller: 'GameController as gc'
        })

        .state('game', {
            url: '/game',
            templateUrl: './Views/game.html',
            controller: 'GameController as gc'
        })

        .state('game.board', {
            url:         '/board.html',
            templateUrl: './Views/board.html',
            controller: 'GameController as gc'
        })

        .state('game.gamePlayers', {
            url:         '/gamePlayers.html',
            templateUrl: './Views/gamePlayers.html',
            controller: 'GameController as gc'
        });
});

app.config(function ($httpProvider) {
    $httpProvider.interceptors.push('AuthService');
});


