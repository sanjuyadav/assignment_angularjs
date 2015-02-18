//basic controller
app.controller('UserController', function($scope,$rootScope){
	$scope.user={name:'',email:''}; //model for new user
	$scope.myform=false; //to set the display value of form
	$scope.myindex=-1; //set the index of user if edit is clicked
	$scope.submittext="add user"; //submit button label of form
	$scope.error = false;
    $scope.user.name = '';
    $scope.user.email ='';
	//add new user
	$scope.add = function(user) {
		var user = angular.copy(user); 
        
        if( user.name == '' || user.email == '' ){
            $scope.error=true;
        }
        else{
            // if the request is for adding new user
    		if( $scope.myindex == -1 )
            {
            	$rootScope.users.push(user);
            }
            else
            {
                //if the request is for modifying the existing user
            	$rootScope.users[$scope.myindex].name = user.name;
            	$rootScope.users[$scope.myindex].email = user.email;
            	$scope.myindex = -1; //reinitialize the index variable
            }
            //reinitialize the user model
    		$scope.user.name = "";
    		$scope.user.email = "";
    		 
    		$scope.myform = !$scope.myform; //toggle the display value of form to hide the form
    		$rootScope.mydataBasic = true; //set the disaply value true of user table
    		$scope.submittext="add user";
            $scope.error=false;
        }
    }

    //delete the  user i
    // params: index of user to be deleted
    $scope.delete=function(index) {
        $rootScope.users.splice(index,1);
        // if the count of user reaches 0 set the display value of user table false
        if($rootScope.users.length == 0 )
        {
        	$rootScope.mydataBasic = false;
        }
    }
    
    // set the display value of add new user of form when add is clicked
    $scope.toggle=function(){
    	$scope.myform = !$scope.myform;
    }

    // edit the username or password of already existing user
    // params: name = username, email = user email , index = index of user in the users array
    $scope.edit=function(name,email,index){
    	$scope.submittext="edit user";
    	$scope.myindex=index; 
    	console.log(name,email,$scope.user.name);
        // if the display value of adduser form is false set it true  
    	if( !$scope.myform )
    		$scope.myform = !$scope.myform;
        // store name and email in user model
    	$scope.user.name=name;
    	$scope.user.email=email;
    	
    }
});