var homeModule = angular.module('mahjong.home', []);

var homeController = require('../Controllers/HomeController');
var homeRoute = require("../Routes/routes");

homeModule.controller('HomeController',  homeController);
homeModule.config(homeRoute);

module.exports = homeModule;