/* this controller specifies the logic layer of the admin page */
/* including the content to be display, sidebar, header */
/* functionailities involve for an admin */
app.controller('adminCtrl', function($scope,$state) {
  $scope.users;
  $scope.controllby = "admin";
  // Initialize Firebase
  $scope.pending_receipt_sum = 2;
  $scope.pending_receipt = [
    {
      receipt_ref: "r1",
      submitted_by : "John Lemon",
      submitted_time: "31",
      submitted_amount: "8.66",
      details: "sjadsjoiadsj iasdn aisdn alsdi jadi jasdi ajsdoi ndi snd"
    }
    ,
    {
      submitted_by : "User007",
      submitted_time: "21",
      submitted_amount: "22.22"
    }
  ];


  /* section for receipt management start * /
  /* review a pending receipt */
  /* fetch a list of pending receipt from server  */
  /* fetch a list of approve receipt from server */
  $scope.reviewReceipt = function(myReceipt){ 
    // testing
    console.log("[DEBUG]: reviewReceipt called");
    //  show page for review this receipt 
    $state.go('admin.view_receipt', {receipt: myReceipt})
    //

  }

  $scope.approve_receipt = function(receipt_ref){
    // call api to approve a pending receipt 
    // notify user 
  }


  $scope.fetch_pending_receipt = function(){

  }

  $scope.fetch_submitted_receipt = function(){

  }
  /* section for receipt management end  */


  // Get a reference to the database service
  var database = firebase.database();
  firebase.database().ref('/users/').once('value').then(function(snapshot) {
    $scope.users = snapshot.val();
  });

  $scope.test = function(){

    console.log("CLiced ");
    console.log($scope.users);
  }
});

