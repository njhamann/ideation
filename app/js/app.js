'use strict';

angular.module('myApp', [
    'ngRoute',
    'myApp.filters',
    'myApp.services',
    'myApp.directives',
    'myApp.controllers',
    'LocalStorageModule'
]).
config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/list', {templateUrl: 'views/list.html', controller: 'List'});
    $routeProvider.when('/settings', {templateUrl: 'views/settings.html', controller: 'Settings'});
    $routeProvider.otherwise({redirectTo: '/list'});
}])
.run(['$rootScope', function($rootScope){
    console.log('root'); 
    $rootScope.storageKeys = {
        lists: 'lists'
    };
}]);
