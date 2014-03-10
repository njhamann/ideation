'use strict';

/* Directives */


angular.module('myApp.directives', [])
    .directive('documentEvents', function() {
        return function(scope, elm, attrs) {
            //document events
            $(document).on('click', function(e) {
                scope.$broadcast('documentClicked');
                scope.$apply();
            });
            
            $(document).on('click', '.list-item', function(e){
                e.stopPropagation();
            });
            
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
                        });
                        scope.saveList();
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
    })
    .directive('contenteditable', function() {
      return {
        restrict: 'A', // only activate on element attribute
        require: '?ngModel', // get a hold of NgModelController
        link: function(scope, element, attrs, ngModel) {
          if(!ngModel) return; // do nothing if no ng-model

          // Specify how UI should be updated
          console.log(scope.$eval(ngModel.$viewValue));
          ngModel.$render = function() {
            element.html(scope.$eval(ngModel.$viewValue) || '');
          };

          // Listen for change events to enable binding
          element.on('blur keyup change', function() {
            scope.$apply(read);
          });
          read(); // initialize

          // Write data to the model
          function read() {
            var html = element.html();
            // When we clear the content editable the browser leaves a <br> behind
            // If strip-br attribute is provided then we strip this out
            if( attrs.stripBr && html == '<br>' ) {
              html = '';
            }
            
            ngModel.$setViewValue(html);
          }
        
        }
      };
    });
