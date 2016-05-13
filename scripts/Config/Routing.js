/**
 * @author Dennis Ritter
 * @name Routing
 * @desc Defines which template should be loaded for a specific url affix
 */
angular.module('perna').config(['$qProvider', '$stateProvider', '$locationProvider', '$urlRouterProvider',
    function ($qProvider, $stateProvider, $locationProvider, $urlRouterProvider) {

        // fixes a ui-router Bug with ui.router module, showing unhandled rejection errors
        // source: https://github.com/angular-ui/ui-router/issues/2699
        // --> https://docs.angularjs.org/api/ng/provider/$qProvider
        $qProvider.errorOnUnhandledRejections(false);

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
