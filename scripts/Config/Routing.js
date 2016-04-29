/**
 *
 */
angular.module('perna').config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    $routeProvider
        .when('/', {
            templateUrl: 'layout/start.html',
            activeTab: 'home'
        })
        .when('/login', {
            templateUrl: 'layout/login.html',
            activeTab: 'login'
        })
        .when('/registration', {
            templateUrl: 'layout/registration.html',
            activeTab: 'submit'
        })
        .otherwise('/');

    $locationProvider.html5Mode(true);

}]);