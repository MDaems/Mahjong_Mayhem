module.exports = function ($stateProvider, $urlRouterProvider) {
$stateProvider

    .state('authcallback', {
        url: '/authcallback?:username&:token',
        templateUrl: './Views/player.html',
        controller: 'PlayerController as pCtrl'
    })
};


