define(['./module'], function (services) {
  'use strict';
  
  services.factory('AuthService', ['$http', '$cookies', 'md5', function ($http, $cookies, md5) {
      var user = null;
      
      try {
        user = $cookies.getObject('auth') || null;
      } catch (err){
        console.log('cookies error');
      }
      
      return {
        login: function (username, password) {
          return $http.post('/api/login', { username : username, password: md5.createHash(password) }).then(function (result) {
            if (result.data.error_code == 0) {
              $cookies.putObject('auth', user = result.data.user);
            }
            return result.data
          })
        },
        logout: function () {
          user = null;
          $cookies.remove('auth');
        },
        getUser: function () {
          return user;
        },
        isLoggedIn : function () {
          return (user)? user : false;
        }
      }
    }]);
});
