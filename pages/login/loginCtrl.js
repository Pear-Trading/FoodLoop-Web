app.controller('loginCtrl', function($scope,$state,$http,$rootScope,authService) {
    /* login variables */
    $scope.username = "user";
    $scope.password = "Doe";
    $scope.fullName = function() {
        return $scope.firstName + " " + $scope.lastName;
    };
    
  
        

    // 1. send request to server to authenticate login information
    // 2.  on succeed, redirect to page
    // 2.1 on failed, display error message
    $scope.signin = function(){
        var foodloop_token_url_login = "http://192.168.2.172:3000/login";
        var loginData = JSON.stringify({
          email : this.username,
          password: this.password
        });
        console.log("Attempting to login in");
        
        $http.post(foodloop_token_url_login,loginData).success(function(repsonse){
            console.log("Resolving response from server");
            console.log(repsonse.data);
        },function(repsonse){
            console.log("Ooops, Something went wrong");
        });     
        authService.setUsername($scope.username);
        // $state.go("user");
        // if($scope.username === "admin"){
        //   $state.go('admin');
        // }
        // else if($scope.username === "user"){
        //   $state.go('user');
        // }
        // else{
        //   $state.go('home');
        // }
    }

    
   
    $scope.createAccount = function(){

      console.log("Create account button clicked");
    }
   
});
