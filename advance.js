//advance controller

//shuffle the user array to randomize the user array
var shuffleArray = function(array) {
	var m = array.length, t, i;

	// if the array has elements
	while (m) {
		i = Math.floor(Math.random() * m--);

		// swap the elements
	    t = array[m];
		array[m] = array[i];
		array[i] = t;
	}

	return array;
}

// creating service for http request
app.factory('getData',function($http){

	return {
	getFilterData: function(){
		return $http.get("http://jsonplaceholder.typicode.com/posts/").then(function(response){
			return response;
		})
	}
	};
});

// advance controller
app.controller('advanceController',function($scope,getData,$filter,$rootScope){
	$scope.dnumber; // variable to store the count of how many users need  to be fetched
	
	// get the list of users
	$scope.fetch=function(){
		$scope.dnumber=$scope.dnumber;
		$rootScope.filterData=[]; // reset the userlist
		$rootScope.selection=[]; // reset the selection array
		// get the data from factory
		getData.getFilterData().then(function(response){
			$rootScope.filterData = response.data;
			shuffleArray($rootScope.filterData);
			$rootScope.mydataAdvance = true; //set disaply value of user information true
			$rootScope.filterData.length = $scope.dnumber; //trim the user array according to count
			$rootScope.selection = angular.copy($rootScope.filterData); // intialize the selection array
			console.log("sanju",$rootScope.selection,$rootScope.filterData);
		});console.log("outside");
	}

	// call when checkbox is touched 
	// params: userid = id of user for which checkbox is checked/unchecked
	$scope.adddelete=function(userid){
		var notPresent = 0; //if checkbox is unchecked intially and now checked


		// search in the selection array which userid is checked and delete the corresponding data
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
			// add the information in the selection array if checkbox is checked again
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

