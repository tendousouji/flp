define(['./module'], function (controllers) {
  'use strict';
    
  controllers.controller('PostCtrl', ['$scope', '$cookieStore', '$window', '$location', '$routeParams', '$timeout', 'Flash', 'Upload', 'MainService', function ($scope, $cookieStore, $window, $location, $routeParams, $timeout, Flash, Upload, MainService) {
    var user = $cookieStore.get('user') || null;

    if(!user){
      $window.location.href = '/admin/login';
    }
    else{
      // show remove button
      $scope.isEdit = true;

      // post init
      $scope.post = {};

      // set default lable
      $scope.pageTitle = 'Update Post';
      $scope.actionBtnText = 'Update';

      // ck-editor options
      $scope.options = {
        language: 'en',
        allowedContent: true,
        entities: false
      };
    
      // Called when the editor is completely ready.
      $scope.onReady = function () {};

      // get categories for select
      MainService.getCategories().then(function (categories){
        $scope.categories = categories;
        $scope.selectedCategory = {
          _id: categories[0]._id
        };
      });

      // get types for select
      MainService.getTypes().then(function (types){
        $scope.types = types;
        $scope.selectedType = {
          _id: types[0]._id
        };
      });

      // upload cover image handle
      $scope.onUpdateThumb = function ($files){
        if($files){
          Upload.upload({
            url: '/api/uploads',
            method: 'POST',
            withCredentials: true,
            file: $files[0]
          }).success(function(data, status, headers, config) {
            $scope.post.image_url = data;
          });
        }
      };

      // ck-editor insert image handle
      $scope.onAddImages = function ($files){
          Upload.upload({
            url: '/api/uploads',
            method: 'POST',
            withCredentials: true,
            file: $files[0]
          }).success(function(data, status, headers, config) {
            $scope.htmlEditor += '<img alt="" src="' + data + '" />';
          });
      };

      // get post detail
      MainService.getPostById({id: $routeParams.id}).then(function(post){
        if(!post){
          Flash.create('danger', 'Error when load post')
          $location.path( "/admin/posts");
        }
        else{
          $scope.post._id = post._id;
          $scope.post.title = post.title;
          $scope.post.description = post.description;
          $scope.selectedType = {_id: post.type};
          $scope.selectedCategory = {_id: post.catalory}
          $scope.post.image_url = post.img_url;
          $scope.htmlEditor = post.content;
        }
      });

      // update post
      $scope.action = function () {
        $scope.post.author_id = user._id;
        $scope.post.content = $scope.htmlEditor;
        $scope.post.slug = MainService.friendlyUrl($scope.post.title);
        $scope.post.type_id = $scope.selectedType._id;
        $scope.post.category_id = $scope.selectedCategory._id;

        MainService.updatePost($scope.post).then(function (numAffected){
          if(numAffected){
            Flash.create('success', 'Update post successfully.');
          }
          else{
            Flash.create('danger','Update post unsuccessfully.');
          }
        });
      };

      $scope.remove = function (){
        MainService.removePost({_id: $routeParams.id}).then(function (result) {
          if (result.isRemove) {
            Flash.create('success', 'Remove post successfully.');
            $location.path( "/admin/posts");
          }
          else{
            Flash.create('danger', 'Remove post unsuccessfully.');
          }
        });
      }

      // ck-editor insert image custom action
      $timeout(function () {
        $('#cke_72').click(function (){
          $timeout(function(){
            $('#cke_206_uiElement')[0].click();
            $('#image_add')[0].click();
          }, 250);
        });
      }, 250);
    }

  }]);
});
