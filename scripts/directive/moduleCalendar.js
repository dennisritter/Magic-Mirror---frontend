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
            controller: ['$scope', 'CalendarService', 'LiveviewService', 'ModuleModalService', 'ReloadService',
                function ($scope, CalendarService, LiveviewService, ModuleModalService, ReloadService) {

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
                        // ReloadService.register($scope.test);
                    };
                    ReloadService.register($scope.getEvents);


                }],

            link: function(scope, ReloadService){
                if (scope.module.calendarIds.length > 0){
                    scope.getEvents();
                }
            }
        };
    }]);

angular.module('perna').controller('ModuleCalendarEditController', ['$scope', 'close', 'calendarIds', 'CalendarService', 'GoogleAuthService',
    function ($scope, close, calendarIds, CalendarService, GoogleAuthService) {
    $scope.availableCalendars = [];
    calendarIds = angular.copy(calendarIds);

    CalendarService.getAvailableCalendars()
      .then(function (calendars) {
          $scope.availableCalendars = calendars;
      })
      .catch(function () {
          var popupGoogleAuth = window.open('', '_blank', "googleAuth", "width=500,height=400");
          popupGoogleAuth.document.write('Bitte warten...');
          GoogleAuthService.googleAuth(popupGoogleAuth)
            .then(function () {
                CalendarService.getAvailableCalendars()
                  .then(function (calendars) {
                      $scope.availableCalendars = calendars;
                  })
                  .catch(function () {
                      close(-1);
                  });
            })
            .catch(function () {
                close(-1);
            });
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