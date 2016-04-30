/**
 *
 */
angular.module('perna').config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    $routeProvider
        .when('/', {
            templateUrl: 'layout/start.html',
            activeTab: 'home'
        })
        .otherwise('/');

    $locationProvider.html5Mode(true);

}]);