//TODO: Remove unnecessary logs.
angular.module('perna').controller('calendarCtrl', ['$scope', 'AuthService', 'calendarService',
    function ($scope, AuthService, calendarService) {

        $scope.usedCalendarIds = [];
        $scope.setUsedCalendars = function(calendarId){
            var index = $scope.usedCalendarIds.indexOf(calendarId);
            if(index > -1){
                console.log("removing: ", $scope.usedCalendarIds[index]);
                $scope.usedCalendarIds.splice(index, 1);
            } else {
                $scope.usedCalendarIds.push(calendarId);
            }
            console.log("used Calendars: ", $scope.usedCalendarIds);
        };
        
        $scope.$watch(function () {
            return calendarService.calendars;
        }, function () {
            $scope.availableCalendars = calendarService.calendars;
            console.log("updated availableCalendars", $scope.availableCalendars);
        });

        $scope.getEvents = function () {
            var successCallback = function (response) {
                console.log("calendarEvents: ", response);
            };
            var errorCallback = function (response) {
                console.error(response);
            };
            calendarService.getEvents($scope.usedCalendarIds).then(successCallback, errorCallback);
        };

    }]);
