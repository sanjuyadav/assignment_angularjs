
var app = angular.module('angularapp', ['ngRoute',"ngMessages",'angular.filter']);

// set the routes for application
app.config(['$routeProvider',
	function($routeProvider){
	$routeProvider.
	when('/basic',{
		templateUrl: 'partials/basic.html',
		controller: 'UserController'
	}).
	when('/advance',{
		templateUrl: 'partials/advance.html',
		controller: 'advanceController'
	});
}]);



