/**
 * @author Dennis Ritter
 * @name Routing
 * @desc Defines which template should be loaded for a specific url affix
 */
angular.module('perna').config(['$stateProvider', '$locationProvider', '$urlRouterProvider',
    function ($stateProvider, $locationProvider, $urlRouterProvider) {

        var authRedirect = ['AuthService', '$state', function (AuthService, $state) {
            if (!AuthService.isAuthenticated) {
                console.error('You are currently not logged in.', 'Permission denied');
                $state.go('start');
            }
        }];

        $stateProvider
            .state('start', {
                url: '/',
                templateUrl: 'layout/start.html',
            })
            .state('dashboard', {
                url: '/dashboard',
                templateUrl: 'layout/dashboard.html',
                onEnter: authRedirect
            })
            .state('usersettings', {
                url: '/usersettings',
                templateUrl: 'layout/usersettings.html',
                onEnter: authRedirect
            });

        $urlRouterProvider.otherwise('/');

        $locationProvider.html5Mode(true);

    }]);
