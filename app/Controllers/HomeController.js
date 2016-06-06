module.exports = function($scope){
	$scope.token = window.localStorage['token'];

	var self = this;
	$scope.myDynamicClass = 'banana';

	self.changeTheme = function(theme) {
		$scope.myDynamicClass = theme;
	};

}