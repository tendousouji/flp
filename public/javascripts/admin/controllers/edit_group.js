define(['./module'], function (controllers) {
  'use strict';
    
  controllers.controller('EditGroupCtrl', ['$scope', '$cookieStore', '$window', '$location', '$routeParams', '$timeout', 'Flash', 'Upload', 'MainService', function ($scope, $cookieStore, $window, $location, $routeParams, $timeout, Flash, Upload, MainService) {
    var user = $cookieStore.get('user') || null;

    if(!user){
      $window.location.href = '/admin/login';
    }
    else{
      // set default lable
      $scope.actionLabel = 'Update';
      $scope.title = 'Edit Group';

      // group init
      $scope.group = {};

      MainService.getGroupById({id: $routeParams.id}).then(function (group){
        $scope.group = group;
        console.log($scope.group);
      });

      // update group
      $scope.actionGroup = function(){
        $scope.group.slug = MainService.friendlyUrl($scope.group.name);

        MainService.updateGroup($scope.group).then(function (numAffected){
          if(numAffected){
            Flash.create('success', 'Update group successfully.');
          }
          else{
            Flash.create('danger','Update group unsuccessfully.');
          }
        })
      };
    }

  }]);
});
