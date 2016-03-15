define(['./module'], function (controllers) {
  'use strict';
    
  controllers.controller('EditCategoryCtrl', ['$scope', '$cookieStore', '$window', '$location', '$routeParams', '$timeout', 'Flash', 'Upload', 'MainService', function ($scope, $cookieStore, $window, $location, $routeParams, $timeout, Flash, Upload, MainService) {
    var user = $cookieStore.get('user') || null;

    if(!user){
      $window.location.href = '/admin/login';
    }
    else{
      $scope.actionLabel = 'Update';

      // category init
      $scope.category = {};

      // set default lable
      $scope.title = 'Edit Category';

      // get group
      MainService.getGroups().then(function (groups) {
        $scope.groups = groups;
      });

      MainService.getCategoyById({id: $routeParams.id}).then(function (category){
        $scope.category = category;
        $scope.selectedGroup = {
          _id: category.group
        };
      });

      // update category
      $scope.actionCategory = function(){
        $scope.category.slug = MainService.friendlyUrl($scope.category.name);
        $scope.category.group_id = $scope.selectedGroup._id;

        MainService.updateCategory($scope.category).then(function (numAffected){
          if(numAffected){
            Flash.create('success', 'Update category successfully.');
          }
          else{
            Flash.create('danger','Update category unsuccessfully.');
          }
        })
      };
    }

  }]);
});
