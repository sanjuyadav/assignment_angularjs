
var app = angular.module('angularapp', ['ngRoute','angular.filter']);

app.config(['$routeProvider',
	function($routeProvider){
	$routeProvider.
	when('/basic',{
		templateUrl: 'partials/basic.html',
		controller: 'UserController',
		reloadOnSearch: false
	}).
	when('/advance',{
		templateUrl: 'partials/advance.html',
		controller: 'advanceController'
	});
}]);

//global variables
app.run(function ($rootScope) {
    $rootScope.users = []; 
    $rootScope.mydataBasic = false;
    $rootScope.selection=[];
    $rootScope.names=[];
    $rootScope.mydataAdvance=false;
});

//basic controller
app.controller('UserController', function($scope,$rootScope){
	$scope.myform=false;
	$scope.myindex=-1;
	
	//add new user
	$scope.add = function(user) {
		var user = angular.copy(user);
		if( $scope.myindex == -1 )
        {
        	$rootScope.users.push(user);
        }
        else
        {
        	$rootScope.users[$scope.myindex].name = user.name;
        	$rootScope.users[$scope.myindex].email = user.email;
        	$scope.myindex = -1;
        }
		$scope.user.name = "";
		$scope.user.email = "";
		$scope.myform = !$scope.myform;
		$rootScope.mydataBasic = true;
    }

    $scope.delete=function(index) {
        $rootScope.users.splice(index,1);
        if($rootScope.users.length == 0 )
        {
        	$rootScope.mydataBasic = false;
        }
    }
    
    $scope.toggle=function(){
    	$scope.myform = !$scope.myform;
    }
    $scope.edit=function(name,email,index){
    	$scope.myform = !$scope.myform;
    	$scope.user.name=name;
    	$scope.user.email=email;
    	$scope.myindex=index;
    }
});

var shuffleArray = function(array) {
  var m = array.length, t, i;

  while (m) {
    i = Math.floor(Math.random() * m--);

  
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}


//advance controller
app.controller('advanceController', function($scope,$http,$filter,$rootScope){
	$scope.dnumber;
	
	$scope.fetch=function(){
		$scope.dnumber=$scope.dnumber
		$http.get("http://jsonplaceholder.typicode.com/posts/").success(function(response){
		shuffleArray(response);
		$rootScope.names=response;
		$rootScope.mydataAdvance=true;
		$rootScope.names.length = $scope.dnumber;
	    $rootScope.selection=angular.copy($rootScope.names);
	});
	}
	$scope.adddelete=function(userid){
		var notPresent = 0;
		for(var i = 0; i < $rootScope.selection.length;i++)
		{
			if( $rootScope.selection[i].userId == userid )
			{
				$rootScope.selection.splice(i,1);
				i--;
				notPresent = 1;
			}
		}

		if( notPresent == 0 )
		{
			for(var i = 0; i < $rootScope.names.length;i++)
			{
				if( $rootScope.names[i].userId == userid )
				{
					$rootScope.selection.push($rootScope.names[i]);
				}
			}
		}
	}
});

