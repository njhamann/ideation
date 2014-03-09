'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
    controller('List', [
    '$scope', 
    function($scope) {
        $scope.listItems = [
            {
                name: 'Jello'
            },
            {
                name: 'Fish'
            }
        ];

        $scope.$on('addItem', function(e){
            $scope.listItems.push({});
        });
        $scope.$on('removeItem', function(e, item){
            $scope.listItems = _.filter($scope.listItems, function(exItem){
                return exItem.name !== item.name;
            });
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
        };
    }])
    .controller('Settings', [function() {

    }]);
