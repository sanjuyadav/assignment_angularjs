//global variables
app.run(function ($rootScope) {
    $rootScope.users = []; //user data array to store the username and email
    $rootScope.mydataBasic = false; //to set the display property of user table in basic.html
    $rootScope.selection=[]; //contain the information of selected users in advance.html
    $rootScope.filterData=[]; // contain the information of all user in advance.html
    $rootScope.mydataAdvance=false; // set the display property of user information in advance.html
});

