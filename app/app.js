require("angular/angular");
require('angular-ui-router');

require('./Modules/HomeModule');
require('./Modules/GameModule');
require('./Modules/PlayerModule');

var app = angular.module('Mahjong', ['ui.router',  'mahjong.game', 'mahjong.player', 'mahjong.home']);

require('./Config/routes.js')(app);
require("./Services/AuthService")(app);