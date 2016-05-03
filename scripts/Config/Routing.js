/**
 *
 */
angular.module('perna').config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    $routeProvider
        .when('/', {
            templateUrl: 'layout/start.html',
            activeTab: 'home'
        })
<<<<<<< HEAD
        .when('/registration', {
            templateUrl: 'layout/registration.html',
            activeTab: 'submit'
        })
        .when('/dashboard', {
            templateUrl: 'layout/dashboard.html',
            activeTab: 'submit'
        })
=======
>>>>>>> feature/initialDesign
        .otherwise('/');

    $locationProvider.html5Mode(true);

}]);