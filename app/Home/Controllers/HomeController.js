module.exports = function($scope, $state){
	$scope.token = window.localStorage['token'];

	var self = this;
	$state.transitionTo('home');

	if(window.localStorage['theme'] != 'undefined')
	{
		$scope.myDynamicClass = window.localStorage['theme'];
	}
	self.changeTheme = function(theme) {
		$scope.myDynamicClass = theme;
		window.localStorage['theme'] = theme;
	};

}