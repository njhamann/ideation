'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
    controller('List', [
    '$scope', 
    'storage',
    function($scope, storage) {
        
        $scope.listItems = storage('select', $scope.$root.storageKeys.lists) || [];
        
        $scope.saveList = function(){
            storage('insert', $scope.$root.storageKeys.lists, $scope.listItems);
        };

        $scope.$on('addItem', function(e){
            $scope.listItems.push({});
            $scope.saveList();
        });

        $scope.$on('removeItem', function(e, item){
            $scope.listItems = _.filter($scope.listItems, function(exItem){
                return exItem.name !== item.name;
            });
            $scope.saveList();
        });
        
        $scope.$on('clearList', function(e, item){
            $scope.listItems = [];
            $scope.saveList();
        });
         
    }])
    .controller('ListItem', [
    '$scope', 
    function($scope) {
        $scope.isEditing = false;
        if(!$scope.item.name){
            $scope.isEditing = true;
        }
        $scope.saveItem = function(){
            $scope.isEditing = false;
            $scope.saveList();
        };
    }])
    .controller('Settings', [function() {

    }]);
