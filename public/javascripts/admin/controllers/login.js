define(['./module'], function (controllers) {
  'use strict';
  
  controllers.controller('LoginCtrl', ['$scope', '$rootScope', '$route', 'md5', '$window', '$cookieStore', 'MainService', function ($scope, $rootScope, $route, md5, $window, $cookieStore, MainService) {
    var user = $cookieStore.get('user') || null;

    if(user != null){
      $window.location.href = '/admin';
    }
    else{
      $scope.login = function () {
        $scope.user.hash_password = md5.createHash($scope.user.password);
        
        MainService.adminAuth($scope.user).then(function (user) {
          if(!user){
            $scope.errors = 'Error: Sai tên đăng nhập hoặc mật khẩu.';
          } else {
            $cookieStore.put('user', user);
            $window.location.href = '/admin';
          }
        });
      }
    }
  }]);
});
