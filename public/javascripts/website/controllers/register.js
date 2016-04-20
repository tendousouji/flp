define(['./module'], function (controllers) {
  'use strict';
  
  controllers.controller('RegisterCtrl', function ($rootScope, $scope, $location, $window, UserService, $routeParams) {
      
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
        // $scope.user.avatar_url = '';
        // $scope.user.type_user = 0;
        // $scope.user.is_active = 0;
        // $scope.user.date_create = null;
        console.log("user:     ", $scope.user);

        //comment to test
        UserService.addUser($scope.user).then(function (user){
          if(user){
            $scope.user = {};
            $scope.user.avatar_url = '';
            $scope.user.type_user = 0;
            $scope.user.is_active = 0;
            $scope.user.date_create = null;
            //Flash.create('success', 'Create new user successfully.');
            console.log("success");
          }
          else{
            //Flash.create('danger', 'Create new user unsuccessfully.');
          }
        });

      }

      $scope.active = function () {
        // var id = '570a03c4db7ba9d01ba42126';
        // var id = $routeParams.id;
        // UserService.activeUser(id).then(function (id){

        // });
        UserService.activeUser({_id: $routeParams.id}).then(function (id){

        });
        console.log('id: ', id);
      }

    });
});
