module.exports = function ($stateProvider) {

    $stateProvider

        .state('createGame', {
            url: '/createGame',
            templateUrl: './Game/Views/createGame.html',
            controller: 'GameController as gCtrl'
        })

        .state('games', {
            url: '/games',
            templateUrl: './Game/Views/games.html',
            controller: 'GameController as gCtrl'
        })

        .state('gameDetails', {
            url: '/gameDetails/:id',
            params: {'id': null },
            templateUrl: './Game/Views/gameDetails.html',
            controller: 'GameDetailsController as gdCtrl'
        })

        .state('game', {
            url: '/game/:id',
            params: {'id': null },
            templateUrl: './Game/Views/game.html',
            controller: 'GameDetailsController as gdCtrl'
        })

        .state('game.board', {
            url: '/board',
            templateUrl: './Game/Views/board.html',
            controller: 'GameDetailsController as gdCtrl'
        })

        .state('game.detail', {
            url: '/gameDetails',
            templateUrl: './Game/Views/gameDetails.html',
            controller: 'GameDetailsController as gdCtrl'
        });
};


