define(['./module'], function (services) {
  'use strict';
  
  services.factory('UserService', ['$http', '$cookies', 'md5', function ($http, $cookies, md5) {
      return {

        addUser: function (data) {
          return $http.post('/api/admin/user/insert', data).then(function (result) {
            if (result.data.error_code == 0) {
              //$cookies.putObject('auth', user = result.data.user);
            }
            return result.data
          })
        }

      }
    }]);
});
