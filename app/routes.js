app.config(function ($routeProvider)
{
	$routeProvider
		.when('/:username:token',
		{
			templateUrl: 'index.html',
			controller: 'Controllers/GameController'
		})
		.when('/',
		{
			templateUrl: 'index.html',
			controller: 'Controllers/GameController'
		})
		.when('/test',
		{
			template: 'views/test.html'
		})
});