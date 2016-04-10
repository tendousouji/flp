define(['./module'], function (controllers) {
  'use strict';
  
  controllers.controller('RegisterCtrl', function ($rootScope, $scope, $location, $window, UserService) {
      
      //register
      
      $scope.register = function () {
        var username = $scope.user.username;
        var password = $scope.user.password;
        var repassword = $scope.repassword;
        var fullname = $scope.user.fullname;
        var email = $scope.user.email;
        console.log("username:  ", $scope.user.username);
        console.log("password:  ", $scope.user.password);
        console.log("repassword: ", $scope.repassword);
        console.log("fullname:      ", $scope.user.full_name);
        console.log("email:     ", $scope.user.email);

        UserService.addUser($scope.user).then(function (user){
          if(user){
            $scope.user = {};
            //$scope.user.is_active = 1;
            //Flash.create('success', 'Create new user successfully.');
            console.log("success");
          }
          else{
            //Flash.create('danger', 'Create new user unsuccessfully.');
          }
        });

      }

    });
});
