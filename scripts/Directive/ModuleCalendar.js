angular.module('perna').directive('moduleCalendar', function () {
    return {
        restrict: 'E',
        templateUrl: 'directive/modules/module-calendar.html' ,
        controller: ['$scope', 'AuthService', 'CalendarService',
            function ($scope, AuthService, CalendarService) {
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
                    return CalendarService.calendars;
                }, function () {
                    $scope.availableCalendars = CalendarService.calendars;
                    console.log("updated availableCalendars", $scope.availableCalendars);
                });

                $scope.getEvents = function () {
                    var successCallback = function (response) {
                        console.log("calendarEvents: ", response);
                    };
                    var errorCallback = function (response) {
                        console.error(response);
                    };
                    CalendarService.getEvents($scope.usedCalendarIds).then(successCallback, errorCallback);
                };
        }],

        //link:
    };
});