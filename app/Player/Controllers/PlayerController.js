module.exports = function($scope, $stateParams){
	var self = this;

	if(window.localStorage['token'] == undefined && window.localStorage['username'] == undefined){
		if($stateParams.token != undefined && $stateParams.username != undefined){
			window.localStorage['token'] = $stateParams.token;
			window.localStorage['username'] = $stateParams.username;
			window.location.reload();
		}
	}
	$scope.token = window.localStorage['token'];
	$scope.username = window.localStorage['username'];


	self.logout = function()
	{
		window.localStorage.clear();
		window.location.href = '#/home/';
		window.location.reload();
	};
}