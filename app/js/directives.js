'use strict';

/* Directives */


angular.module('myApp.directives', [])
    .directive('documentEvents', function() {
        return function(scope, elm, attrs) {
            //document events
            $(document).on('click', function(e) {
                scope.$apply(function(){
                    scope.$broadcast('documentClicked');
                }); 
            });
            
            $(document).on('click', '.list-item', function(e){
                e.stopPropagation();
            });
        }; 
    })
    .directive('scaleInput', function() {
        function resize($el, len){
            var value = $el.val(); 
            var len = len || value.length * 7;
            if(len > 100){
                $el.width(len);
            }else{
                $el.width(100);
            }
        }
        return function(scope, elm, attrs) {
            //document events
            elm.on('keyup keydown', function(e) {
                resize($(this));
            });

            resize($(elm), scope.$eval(attrs.ngModel).length);
            
        }; 
    })
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
                            scope.saveList();
                        });
                    }
                }
            });
        };
    }])
    .directive('editMode', function() {
        return function(scope, elm, attrs) {
            scope.$watch('isEditing', function(isEditing){
                if(isEditing){
                    $('#list_container').sortable( 'disable' );
                }else{
                    $('#list_container').sortable( 'enable' );
                }
            });
        };
    });
