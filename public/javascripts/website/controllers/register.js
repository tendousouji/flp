define(['./module'], function (controllers) {
  'use strict';
  
  controllers.controller('RegisterCtrl', function ($rootScope, $scope, $location, $window, UserService, $routeParams) {
      
      //register
      $scope.register = function () {
        console.log("user:     ", $scope.user);
        //comment to test
        UserService.addUser($scope.user).then(function (user){
          if(user){
            $scope.user = {};
            //Flash.create('success', 'Create new user successfully.');
            console.log("success");
            $('#cancel_register').trigger('click');
          }
          else{
            //Flash.create('danger', 'Create new user unsuccessfully.');
          }
        });

      }

      $scope.active = function () {
        // var id = $routeParams.id;
        // UserService.activeUser(id).then(function (id){
        // });
        UserService.activeUser({_id: $routeParams.id}).then(function (id){
        });
        console.log('id: ', id);
      }

    });
});
