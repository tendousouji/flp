define(['./module'], function (services) {
  'use strict';
  
  services.factory('UserService', ['$http', '$cookies', 'md5', function ($http, $cookies, md5) {
      return {

        addUser: function (data) {
          console.log("in addUser");
          data.password = md5.createHash(data.password);
          return $http.post('/api/admin/user/insert', data).then(function (result) {
            if (result.data.error_code == 0) {
              $cookies.putObject('auth', user = result.data.user);
            }
            return result.data;
          });
        },

        activeUser: function (data) {
          console.log(data);
          return $http.post('/api/admin/user/active', data).then(function (result) {
            console.log(result.data);
            return result.data;
          });
        }

      }
    }]);
});
