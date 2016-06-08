require("angular/angular");
require('angular-ui-router');

var app = angular.module('Mahjong', ['ui.router',  'mahjong.game', 'mahjong.player', 'mahjong.home', 'mahjong.auth']);

//require('./Config/routes.js')(app);
//require("./Auth/Services/AuthService")(app);

require('./Home/Modules/HomeModule');
require('./Game/Modules/GameModule');
require('./Player/Modules/PlayerModule');
require('./Auth/Modules/AuthModule');


app.config(function ($httpProvider) {
    $httpProvider.interceptors.push('AuthService');
});
