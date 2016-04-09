﻿define(['./module'], function (controllers) {
  'use strict';
  
  controllers.controller('LoginCtrl', ['$rootScope', '$scope', '$location', '$window', 'AuthService', function ($rootScope, $scope, $location, $window, AuthService) {
      var redirectTo = $location.search()['redirect'] || '';
      
      $scope.username = '';
      $scope.password = '';
      $scope.error_message = '';
      
      //load user
      $scope.user = AuthService.getUser();
      
      console.log("user: ", $scope.user);
      console.log("is login: ", AuthService.isLoggedIn());

      var replaceLogReg = function(){
        if (AuthService.isLoggedIn()) {
          $('#login').hide();
          $('#register').hide();
          // $('#user').show();
          // $('#logout').show();
          $('#user').append('<a href="#">'+$scope.user.username+'<img src="images/admin/user_admin.png" class="user-img img-circle"/></a>');
          $('#logout').append('<a href="#" ng-click="logout()"><i class="fa fa-sign-out"></i> Sign out</a>');
        }else{
          $('#login').show();
          $('#register').show();
          $('#user').hide();
          $('#logout').hide();
        }
      }

      replaceLogReg();
      
      //Login
      $scope.login = function () {      
        console.log("user", $scope.user);
        AuthService.login($scope.user.username, $scope.user.password).then(function (result) {
          switch (result.error_code) {
            case -5: {
              $scope.error_message = 'Máy chủ bị lỗi';
            }
            case -4: {
              $scope.error_message = 'Tài khoản không tồn tại';
            }
            break;
            case -3: {
              $scope.error_message = 'Sai mật khẩu';
            }
            break;
            case -2: {
              $scope.error_message = 'Tài khoản chưa kích hoạt';
            }
            break;
            case -1: {
              $scope.error_message = 'Hãy nhập đầy đủ tên đăng nhập và mật khẩu';
            }
            break;
            case 0: {
              //Login success
              $scope.user = AuthService.getUser();
              $scope.error_message = null;
              replaceLogReg();
              $('#cancel').trigger('click');
              if (!redirectTo == '') {
                // $window.location.href = redirectTo;
                $window.location.href = '/home';
              }
            }
            break;
          }
        });
      }

      // logout
      $scope.logout = function () {
        // $cookieStore.remove(user);
        AuthService.logout().then(function (result) {
          console.log("logout");
          replaceLogReg();
        });
      }

    }]);
});
