require("angular/angular");
require('angular-ui-router');

require('../Modules/HomeModule');
require('../Modules/GameModule');
require('../Modules/PlayerModule');


require("../Services/AuthService")(app);
require('../routes.js')(app);

var app = angular.module('Mahjong', ['ui.router',  'mahjong.game', 'mahjong.player', 'mahjong.home']);


