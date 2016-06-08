module.exports = function ($stateProvider) {

    $stateProvider
        .state('profile', {
            url: '/profile',
            templateUrl: './Views/player.html',
            controller: 'PlayerController as pCtrl'
        })
};


