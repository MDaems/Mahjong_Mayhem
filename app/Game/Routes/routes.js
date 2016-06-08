module.exports = function ($stateProvider) {

        $stateProvider

            .state('createGame', {
                url: '/createGame',
                templateUrl: './Game/Views/createGame.html',
                controller: 'GameController as gc'
            })

            .state('games', {
                url: '/games',
                templateUrl: './Game/Views/games.html',
                controller: 'GameController as gc'
            })

            .state('gameDetails', {
                url: '/gameDetails',
                templateUrl: './Game/Views/gameDetails.html',
                controller: 'GameController as gc'
            })

            .state('game', {
                url: '/game',
                templateUrl: './Game/Views/game.html',
                controller: 'GameController as gc'
            })

            .state('game.board', {
                url: '/board.html',
                templateUrl: './Game/Views/board.html',
                controller: 'GameController as gc'
            })

            .state('game.detail', {
                url: '/gameDetails.html',
                templateUrl: './Game/Views/gameDetails.html',
                controller: 'GameController as gc'
            });
};


