angular.module('perna').controller('DashboardCtrl', ['$scope', '$state', 'AuthService', 'MouseService', 'CalendarService', 'GridService',
    function ($scope, $state, AuthService, MouseService, CalendarService, GridService) {
        
        $scope.mouseIsMoving = function () {
            MouseService.mouseIsMoving();
        };

        $scope.logout = function () {
            console.log("logout() in DashboardCtrl called..");
            var successCallback = function () {
                $state.go('start');
            };
            var errorCallback = function (response) {
                console.error("Response ", response);
            };

            AuthService.logout().then(successCallback, errorCallback);
        };
        /*
         * Moved to liveviewCtrl
        $scope.addCalendar = function () {
            if (CalendarService.calendars.length === 0) {
                getCalendars();
            }
        };

        var getCalendars = function () {
            var successCallback = function (response) {
                console.log("Loaded available Calendars");
            };
            var errorCallback = function (response) {
                console.error(response);
            };
            CalendarService.getCalendars().then(successCallback, errorCallback);
        };
        */

    }]);
