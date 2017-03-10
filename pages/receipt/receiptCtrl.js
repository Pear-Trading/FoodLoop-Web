app.controller('receiptCtrl',function($scope,$http,uploadReceiptService) {  

  // display the list of all exsiting store, validated and not validated  
  $scope.storelist; 

  // require param for upload api
  $scope.microCurrencyValue; 
  $scope.transactionAdditionType;
  $scope.addValidatedId;

  $scope.storename;

  // photo and path to the photo
  $scope.receiptPhoto;
  $scope.receiptPhotoSrc;

  // list of pending reciepts await for approval from admin
  $scope.pending_list = [
    {submitted_time: 30 },{submitted_time:20},{submitted_time:10},{submitted_time:5},{submitted_time:1}
  ];


  var foodloop_token_url_search = "http://192.168.2.172:3000/search";


  // get the latest store list 
  $scope.getStoreList = function(){
    var data = {
      "searchName": "",
      "searchLocation": "" 
    };
    $http.post(foodloop_token_url_search,data).then(function(response){
      console.log(response);
    });

    //  API call to /search to fetch a list of store
  }

  $scope.storelist = $scope.getStoreList();
  
  // select the image 
  $scope.getImage = function(element) {
    var reader = new FileReader();
    reader.onload = function(event) {
      $scope.$apply(function($scope) {
        $scope.receiptPhoto = element.files[0];
        $scope.receiptPhotoSrc = event.target.result  
      });
    }
    reader.readAsDataURL(element.files[0]);
  }

  // upload the receipt to the server
  $scope.uploadReceipt = function(){
    uploadReceiptService.uploadReceipt();
  }


  // test
  // firebase api to upload an image
  
});
