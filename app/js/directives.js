'use strict';

/* Directives */


angular.module('myApp.directives', [])
    .directive('sortable', [
    'MoveIndex', 
    function(move) {
        var startingIndex = null;
        return function(scope, elm, attrs) {
            elm.sortable({
                start: function(e, ui){
                    startingIndex = ui.item.index();
                },
                update: function(e, ui){
                    if(startingIndex != null){
                        scope.$apply(function(){
                            move(scope.listItems, startingIndex, ui.item.index());
                        });
                    }
                }
            });
        };
    }])
    .directive('editMode', function() {
        var startingIndex = null;
        return function(scope, elm, attrs) {
            scope.$watch('isEditing', function(isEditing){
                console.log('isEdiable2');
                if(isEditing){
                    $('#list_container').sortable( 'disable' );
                }else{
                    $('#list_container').sortable( 'enable' );
                }
            });
        };
    });
