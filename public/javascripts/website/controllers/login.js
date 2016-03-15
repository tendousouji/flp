define(['./module'], function (controllers) {
  'use strict';
  
  controllers.controller('LoginCtrl', ['$rootScope', '$scope', '$location', '$window', 'AuthService', function ($rootScope, $scope, $location, $window, AuthService) {
      var redirectTo = $location.search()['redirect'] || '';
      
      $scope.username = '';
      $scope.password = '';
      $scope.error_message = '';
      
      //load user
      $scope.user = AuthService.getUser();
      
      console.log($scope.user);
      
      //Login
      $scope.login = function () {      
        AuthService.login($scope.username, $scope.password).then(function (result) {
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
              
              if (!redirectTo == '') {
                $window.location.href = redirectTo;
              }
            }
            break;
          }
        });
      }
    }]);
});
