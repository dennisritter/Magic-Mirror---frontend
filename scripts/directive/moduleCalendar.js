/**
 * @author Dennis Ritter
 * @name moduleCalendar
 * @desc The directive to use when including a calendar module the dashboard.
 * Manages and describes the functioning and structure of a calendar module.
 */
angular.module('perna').directive('moduleCalendar', ['routes',
    function (routes) {
        return {
            restrict: 'E',
            templateUrl: routes.calendar,
            controller: ['$scope', 'AuthService', 'CalendarService',
                function ($scope, AuthService, CalendarService) {
                    /**
                     * @name configMode
                     * @desc Switch for the view to show either the Events or Settings for this calendar module.
                     * If true: show settings view.
                     * If false: show events view.
                     * @type {boolean}
                     */
                    $scope.configMode = true;
                    /**
                     * @name: usedCalendarIds
                     * @desc The Ids of the calendars used in this calendar module
                     * @type {Array}
                     */
                    $scope.usedCalendarIds = [];
                    /**
                     * @name events
                     * @desc The events to show in the events view of this calendar module.
                     * @type {Array}
                     */
                    $scope.events = [];

                    /**
                     * @desc Watches the calendars attribute of CalendarService and synchronizes the available calendars with it.
                     * Allows to show a checklist of available calendars to the user when setting up the calendar module.
                     */
                    $scope.$watch(function () {
                        return CalendarService.calendars;
                    }, function () {
                        $scope.availableCalendars = CalendarService.calendars;
                    });

                    /**
                     * @name updateUsedCalendars
                     * @desc Updates the usedCalendarsIds array. Adds or removes a calendar from the array.
                     * Adds it if it´s not present. Removes it if it´s present.
                     * @param calendarId        The is of the calendar to Add/remove from the used calendars
                     */
                    $scope.updateUsedCalendars = function (calendarId) {
                        var index = $scope.usedCalendarIds.indexOf(calendarId);
                        if (index > -1) {
                            console.log("removing: ", $scope.usedCalendarIds[index]);
                            $scope.usedCalendarIds.splice(index, 1);
                        } else {
                            $scope.usedCalendarIds.push(calendarId);
                        }
                        console.log("used Calendars: ", $scope.usedCalendarIds);
                    };

                    /**
                     * @name getEvents
                     * @desc Loads the events for the used calendars in this module.
                     */
                    $scope.getEvents = function () {
                        var successCallback = function (response) {
                            console.log("calendarEvents: ", response);
                            $scope.events = response.data;
                        };
                        var errorCallback = function (response) {
                            console.error(response);
                        };
                        CalendarService.getEvents($scope.usedCalendarIds).then(successCallback, errorCallback);
                    };


                    $scope.save = function () {
                        $scope.configMode = false;
                        $scope.getEvents();
                    };

                    $scope.edit = function () {
                        $scope.configMode = true;
                    };
                }]

            //link:
        };
    }]);
