/**
 *
 */
angular.module('perna').config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    $routeProvider
        .when('/', {
            templateUrl: 'layout/login.html',
            activeTab: 'home'
        })
        .when('/registration', {
            templateUrl: 'layout/registration.html',
            activeTab: 'submit'
        })
        .when('/dashboard', {
            templateUrl: 'layout/dashboard.html',
            activeTab: 'submit'
        })
        .otherwise('/');

    $locationProvider.html5Mode(true);

}]);