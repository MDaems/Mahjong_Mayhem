module.exports = function ($stateProvider, $urlRouterProvider) {
$stateProvider

    .state('authcallback', {
        url: '/authcallback?:username&:token',
        templateUrl: './../Player/Views/player.html',
        controller: 'PlayerController as pCtrl'
    })
};


