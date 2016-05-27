angular.module('Mahjong').factory('AuthService', function () {
  return {
    request: function (config) {

      config.headers['X-username'] = window.localStorage['username'] != undefined ? window.localStorage['username'] : null;
      config.headers['X-token'] = window.localStorage['token'] != undefined ? window.localStorage['token'] : null;

      return config;
    }
  };
});