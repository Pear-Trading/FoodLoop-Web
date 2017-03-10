var app = angular.module(
  "FoodLoop", 
  [
    'ngRoute',
    'ui.router'
  ]
);

// calling order
// 1-> app.config()
// 2-> app.run()
// 3-> directive's compile functions (if they are found in the dom)
// 4-> app.controller()
// 5-> directive's link functions (again, if found)


app.config(function($stateProvider, $urlRouterProvider) {
  // use $urlRouterProvider to catch all the illeage cases 
  // $urlRouterProvider.otherwise("/login");

  $stateProvider
     // if loggin as user
    .state('user',{
      url:"/user",
      views:{
        '': {templateUrl:'pages/home/home.html',controller:'userCtrl'},
        'header@user': {templateUrl:'pages/user/header.user.html'},   // nested view
        'sidebar@user': {templateUrl:'pages/user/sidebar.user.html'},
        'main@user': {templateUrl:'pages/user/main.user.html'},
      },data:{
        requireLogin: false
      }
    })
    .state('user.receipt',{
      url:"",
      views:{
        'main@user': {templateUrl:'pages/receipt/receipt.html',controller:"receiptCtrl"},
      }
    })
    .state('user.leaderboard',{
      url:"",
      views:{
        'main@user': {templateUrl:'pages/user/main.leaderboard.html'},
      }
    })
    .state('user.settings',{
      url:"",
      views:{
        'main@user': {templateUrl:'pages/user/main.settings.html'},
      }
    })
    .state('user.help',{
      url:"",
      views:{
        'main@user': {templateUrl:'pages/user/main.settings.html'},
      }
    })
    .state('admin.view_receipt',{
      url:"",
      params: {
        receipt: null,
      },
      views:{
        'main@admin': {
          templateUrl:'pages/admin/main.receipt.html',
          controller: function($scope,$stateParams){
            $scope.receipt = $stateParams.receipt;
            console.log($scope.receipt);
          }},
      },data:{
        requireLogin: false
      }
      }
    )
    .state('admin',{
      url:"/admin",
      controller: 'adminCtrl',
      views:{
        '': { templateUrl: 'pages/home/home.html',controller:'adminCtrl'},  // default view}
        'header@admin': {templateUrl:'pages/admin/header.admin.html'},   // nested view
        'sidebar@admin': {templateUrl:'pages/admin/sidebar.admin.html'},
        'main@admin': {templateUrl:'pages/admin/main.admin.html'},
      },data:{
        requireLogin: false
      }
    })
    .state('trader',{
      url:"/trader",
      views:{
        '': { templateUrl: 'pages/home/home.html',controller:'traderCtrl'},  // default view}
        'header@trader': {templateUrl:'pages/trader/header.trader.html'},   // nested view
        'sidebar@trader': {templateUrl:'pages/trader/sidebar.trader.html'},
        'main@trader': {templateUrl:'pages/trader/main.trader.html'},
      },data:{
        requireLogin: false
      }
    })

    .state('map',{
      url: '/map',
      templateUrl: 'pages/map/map.html',
      controller: 'mapCtrl',
      data: {
        requireLogin : false
      }
    })
    .state('login',{
      url: '',
      templateUrl: 'pages/login/login.html',
      controller: 'loginCtrl',
      data: {
        requireLogin : false
      }
    });

});


/* redirects to different page based on whether the user is login or not and    */
/* if log on, check user type and redirect/construct a custom dashboard page   */
/* to extend, users may have a custome dashboard with different layout, this  */
/* needs to be handled using HTML page which is specifically constucted by   */
/* page'controller and obtain variable setting from server                  */
// /* if not, redirect to login in page                                       */
app.run(function ($rootScope,$state,authService) {  // kickstart the application
  // listening to the when a state change start
  console.log("State changes");
  $rootScope.$on('$stateChangeStart', function (event, toState, toParams) { 
    console.log(toState);
    // var requireLogin = toState.data.requireLogin;
    // redirect to login page if satisfy the following conditions
    // 1. seesion expired and user tries to access a page 
    // if ((requireLogin && typeof $rootScope.currentUser === 'undefined')) {
    //   event.preventDefault();
    //   $state.transitionTo('login');
    // }
  });
  //  Testing, configuration to firebase
  var config = {
  apiKey: "AIzaSyDypwjmMD818GQTTfyhTpx76ChJpDsZGek",
  authDomain: "foodloop-666db.firebaseapp.com",
  databaseURL: "https://foodloop-666db.firebaseio.com",
  storageBucket: "foodloop-666db.appspot.com",
  messagingSenderId: "832579459759"
  };
  firebase.initializeApp(config);
  
})

