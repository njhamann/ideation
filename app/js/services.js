'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', []).
    factory('MoveIndex', function(){
        return function(arr, old_index, new_index){
            if (new_index >= arr.length) {
                var k = new_index - arr.length;
                while ((k--) + 1) {
                    arr.push(undefined);
                }
            }
            arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
            return arr;
        }; 
    });
