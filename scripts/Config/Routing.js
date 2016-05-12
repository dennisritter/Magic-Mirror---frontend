/**
 * @author Dennis Ritter
 * @name Routing
 * @desc Defines which template should be loaded for a specific url affix
 */
angular.module('perna').config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    $routeProvider
        .when('/', {
            templateUrl: 'layout/start.html',
            activeTab: 'home'
        })
        .when('/dashboard', {
            templateUrl: 'layout/dashboard.html',
            activeTab: 'submit'
        })
        .when('/usersettings', {
            templateUrl: 'layout/usersettings.html',
            activeTab: 'submit'
        })
        .otherwise('/');

    $locationProvider.html5Mode(true);

}]);
