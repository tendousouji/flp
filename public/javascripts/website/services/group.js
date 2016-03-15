define(['./module'], function (services) {
  'use strict';
  
  services.factory('GroupService', ['$http', function ($http) {
      return {
        findJoinChild: function (conditions, populates, joins) {
          return $http.post('/api/group/findJoinChild', { conditions : conditions , populates: populates, joins: joins}).then(function (result) {
            return result.data;
          })
        }
      }
    }]);
});
