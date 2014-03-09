'use strict';

/* Directives */


angular.module('myApp.directives', []).
    directive('sortable', [
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
    }]);
