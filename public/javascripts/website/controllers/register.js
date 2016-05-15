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
            console.log("success");
            $('#cancel_register').trigger('click');
          }
          else{

          }
        });
      }

      $scope.active = function () {
        UserService.activeUser({_id: $routeParams.id}).then(function (id){
          $window.location.href = '/';
        });
        console.log('id: ', id);
      }

    });
});
