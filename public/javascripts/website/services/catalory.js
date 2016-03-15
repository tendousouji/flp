define(['./module'], function (services) {
  'use strict';
  
  services.factory('CataloryService', ['$http', function ($http) {
      return {
        find: function (conditions, populates, joins) {
          return $http.post('/api/catalory/find', { conditions: conditions, populates: populates , joins: joins}).then(function (result) {
            return result.data;
          })
        },
        getByGroup: function (groupSlug) {
          return $http.post('/api/catalory/getByGroupSlug', { slug : groupSlug }).then(function (result) {
            return result.data;
          })
        },
        topCatalories: function () {
          return $http.post('/api/catalory/top').then(function (result) {
            return result.data;
          })
        },
        findTopCatalory: function (groups) {
          var catalories = [];
          
          //get list catalory
          for (var i in groups) {
            for (var j in groups[i].catalories) {
              groups[i].catalories[j].likes = 0;
              groups[i].catalories[j].comments = 0;
              groups[i].catalories[j].views = 0;
              //count total like
              for (var k in groups[i].catalories[j].posts) {
                groups[i].catalories[j].likes += groups[i].catalories[j].posts[k].likes.length;
                groups[i].catalories[j].views += groups[i].catalories[j].posts[k].views.length;
                groups[i].catalories[j].comments += groups[i].catalories[j].posts[k].comments.length;
              }
              
              catalories.push(groups[i].catalories[j]);
            }
          }
          
          //sort catalories by like
          catalories.sort(function (a, b) { return b.likes - a.likes; });
          
          return catalories;
        }
      }
    }]);
});
