angular.module('perna').controller('dashboardCtrl', ['$scope', '$state', 'AuthService', 'MouseService', 'calendarService',
    function ($scope, $state, AuthService, MouseService, calendarService) {

        $scope.mouseIsMoving = function () {
            MouseService.mouseIsMoving();
        };

        $scope.logout = function () {
            var successCallback = function () {
                $state.go('start');
            };
            var errorCallback = function (response) {
                console.error("Response ", response);
            };

            AuthService.logout().then(successCallback, errorCallback);
        };

        $scope.addCalendar = function () {
            if (calendarService.calendars.length === 0) {
                getCalendars();
            }
            //make new container including a calendar
        };

        var getCalendars = function () {
            var successCallback = function (response) {
                console.log("Loaded Calendars into --> calendarService.calendars");
            };
            var errorCallback = function (response) {
                console.error(response);
            };
            calendarService.getCalendars().then(successCallback, errorCallback);
        };


    }]);
