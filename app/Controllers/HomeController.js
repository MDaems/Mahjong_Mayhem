module.exports = function($scope){
	$scope.token = window.localStorage['token'];

	var self = this;

	self.changeTheme = function(theme) {
		$scope.myDynamicClass = theme;
	};

}