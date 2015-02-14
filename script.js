
var app = angular.module('angularapp', ['ngRoute','angular.filter']);

app.config(['$routeProvider',
	function($routeProvider){
	$routeProvider.
	when('/basic',{
		templateUrl: 'basic.html'
	}).
	when('/advance',{
		templateUrl: 'partials/advance.html'
	});
}]);


app.controller('UserController', function($scope){
	$scope.users = [];
	$scope.myform=false;
	$scope.myindex=-1;
	$scope.mydata=false;
	$scope.add = function() {
        $scope.users.push($scope.UserInfo);
		$scope.UserInfo = "";
		$scope.myform = !$scope.myform;
		$scope.mydata = true;
    }

    $scope.delete=function(index) {
        $scope.users.splice(index,1);
    }
    $scope.toggle=function(){
    	$scope.myform = !$scope.myform;
    }
    $scope.edit=function(user){
    	$scope.myform = !$scope.myform;
    	$scope.name=user.name;
    	$scope.email=user.email;
    	$scope.myindex=$scope.users.indexOf(user);
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



app.controller('advanceController', function($scope,$http,$filter){
	$scope.selection=[];
	$scope.names=[];
	$scope.dnumber;
	$scope.mydata=false;
	
	$scope.fetch=function(){
		$scope.dnumber=$scope.dnumber
		$http.get("http://jsonplaceholder.typicode.com/posts/").success(function(response){
		shuffleArray(response);
		$scope.names=response;
		$scope.mydata=true;
		$scope.names.length = $scope.dnumber;
	    $scope.selection=angular.copy($scope.names);
	});
	}
	$scope.toggle=function(userid){
		var notPresent = 0;
		for(var i = 0; i < $scope.selection.length;i++)
		{
			if( $scope.selection[i].userId == userid )
			{
				$scope.selection.splice(i,1);
				i--;
				notPresent = 1;
			}
		}

		// if( notPresent == 1 )
		// {
		// 	for(var i = 0; i < $scope.names.length;i++)
		// 	{
		// 		if( $scope.names[i].userId == userid )
		// 		{
		// 			$scope.selection.push($scope.names[i]);
		// 		}
		// 	}
		// }
	}
});

