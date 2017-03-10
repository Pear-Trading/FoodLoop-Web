/* this service handles all the authentication between client and server */
app.service('authService', function ($http) {
    //  send a login information to server 
    //  upon success, set sessionToken and store data in dataService
    //  upon failed, return error 
    this.username = ""; 
    this.getUsername = function(){
        return this.username;
    }

    this.setUsername = function(setTo){
        this.username = setTo;
    }
});