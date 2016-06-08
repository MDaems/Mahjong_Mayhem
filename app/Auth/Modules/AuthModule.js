var authModule = angular.module('mahjong.auth', []);

var autService = require('../Services/AuthService');
var authRoute = require("../Routes/routes");

authModule.factory('AuthService', ['$http', autService]);
authModule.config(authRoute);


module.exports = authModule;