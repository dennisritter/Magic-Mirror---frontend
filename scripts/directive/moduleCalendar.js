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
            scope: {
              'module': '='
            },
            controller: ['$scope', 'CalendarService', 'LiveviewService', 'ModuleModalService',
                function ($scope, CalendarService, LiveviewService, ModuleModalService) {

                    /**
                     * @name events
                     * @desc The events to show in the events view of this calendar module.
                     * @type {Array}
                     */
                    $scope.events = [];

                    /**
                     * @name getEvents
                     * @desc Loads the events for the used calendars in this module.
                     */
                    $scope.getEvents = function () {
                        CalendarService.getEvents($scope.module.calendarIds)
                          .then(function (events) {
                              $scope.events = events;
                          });
                    };
                    
                    $scope.edit = function () {
                        ModuleModalService.openCalendarModal($scope.module.calendarIds)
                          .then(function (calendarIds) {
                              $scope.module.calendarIds = calendarIds;
                              $scope.getEvents();
                              LiveviewService.persist();
                          });
                    };

                    $scope.delete = function () {
                        LiveviewService.deleteModule($scope.module);
                    };
                }],

            link: function(scope){
                if (scope.module.calendarIds.length > 0){
                    scope.getEvents();
                }
            }
        };
    }]);

angular.module('perna').controller('ModuleCalendarEditController', ['$scope', 'close', 'calendarIds', 'CalendarService',
    function ($scope, close, calendarIds, CalendarService) {
    $scope.availableCalendars = [];
    calendarIds = angular.copy(calendarIds);

    CalendarService.getAvailableCalendars()
      .then(function (calendars) {
          $scope.availableCalendars = calendars;
      });

    $scope.isSelected = function (calendar) {
        return calendarIds.indexOf(calendar.id) > -1;
    };

    $scope.toggleCalendar = function (calendar) {
        if ($scope.isSelected(calendar)) {
            calendarIds.splice(calendarIds.indexOf(calendar.id), 1);
        } else {
            calendarIds.push(calendar.id);
        }
    };

    $scope.submit = function () {
        close(calendarIds);
    };

    $scope.cancel = function () {
        close(-1);
    };
}]);