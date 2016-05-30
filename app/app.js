require("angular/angular");
require('angular-ui-router');

require('./Modules/HomeModule');
require('./Modules/GameModule');
require('./Modules/PlayerModule');

require('./routes.js');

var authService = require("./Services/AuthService");
