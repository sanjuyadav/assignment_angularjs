
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
    $rootScope.filterData=[];
    $rootScope.mydataAdvance=false;
});

//basic controller
app.controller('UserController', function($scope,$rootScope){
	$scope.user={name:'',email:''};
	$scope.myform=false;
	$scope.myindex=-1;
	$scope.submittext="add user";
	
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
		$scope.submittext="add user";
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
    	scope: false;
    	$scope.submittext="edit user";
    	$scope.myindex=index;
    	console.log(name,email,$scope.user.name);
    	if( !$scope.myform )
    		$scope.myform = !$scope.myform;
    	$scope.user.name=name;
    	$scope.user.email=email;
    	
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

app.factory('getData',function($http){

	return {
	getFilterData: function(){
		return $http.get("http://jsonplaceholder.typicode.com/posts/").then(function(response){
			return response;
		})
	}
	};
});

//advance controller
app.controller('advanceController',function($scope,getData,$filter,$rootScope){
	$scope.dnumber;
	
	$scope.fetch=function(){
		$scope.dnumber=$scope.dnumber;
		$rootScope.filterData=[];
		$rootScope.selection=[]
		getData.getFilterData().then(function(response){
			$rootScope.filterData = response.data;
			shuffleArray($rootScope.filterData);
			$rootScope.mydataAdvance = true;
			$rootScope.filterData.length = $scope.dnumber;
			$rootScope.selection = angular.copy($rootScope.filterData);
			console.log("sanju",$rootScope.selection,$rootScope.filterData);
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
			for(var i = 0; i < $rootScope.filterData.length;i++)
			{
				if( $rootScope.filterData[i].userId == userid )
				{
					$rootScope.selection.push($rootScope.filterData[i]);
				}
			}
		}
	}
});

