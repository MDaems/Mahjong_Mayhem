require("angular/angular");

var homeModule = angular.module('mahjong.home', []);

var homeController = require('../Controllers/HomeController');
homeModule.controller('HomeController',  homeController);

module.exports = homeModule;