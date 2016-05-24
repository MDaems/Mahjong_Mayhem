module.exports = function($scope, $stateParams){
	var self = this;

	console.log('PlayerController reached');

	if(window.localStorage['token'] == undefined && window.localStorage['username'] == undefined){
		if($stateParams.token != undefined && $stateParams.username != undefined){
			window.localStorage['token'] = $stateParams.token;
			window.localStorage['username'] = $stateParams.username;
		}
	}
	$scope.token = window.localStorage['token'];
	$scope.username = window.localStorage['username'];
	console.log(window.localStorage);
}