angular.module('perna').controller('LiveviewCtrl', ['$scope', '$window', '$interval', 'LiveviewService', 'CalendarService', 'ReloadService', 'ModuleModalService',
    function ($scope, $window,  $interval, LiveviewService, CalendarService, ReloadService, ModuleModalService) {
        /**
         * @name: requestLiveview
         * @desc: Request the Liveview after pageload is completed and build it immediatly.
         */
        var requestLiveview = function () {
            var successCallback = function (response) {

            };
            var errorCallback = function (response) {
                console.error(response.error);
            };
            angular.element(document).ready(function () {
                LiveviewService.requestLiveview().then(successCallback, errorCallback);
                refreshLiveview();
            });
        };

        /**
         * @name: refreshLiveview
         * @desc: Rebuilds the Liveview after the document is loaded completely
         */
        var refreshLiveview = function () {
            angular.element(document).ready(function () {
                LiveviewService.buildLiveview();
            });
        };

        // Start the AutoReloader after initialisation
        requestLiveview();
        ReloadService.start();

        /**
         * @name: addModule
         * @desc: adds a module to the Liveview
         * @param: module    The module to add.
         */
        var addModule = function (module) {
            LiveviewService.addModule(module);
            refreshLiveview();
        };

        $scope.modules = [];

        $window.addEventListener("moduleDragged", function () {
            LiveviewService.persist();
        });

        $scope.$watch(function () {
                return LiveviewService.liveview.modules;
            },
            function () {
                $scope.modules = LiveviewService.liveview.modules;
                refreshLiveview();
            });

        //********** TIME
        // The default timeModule
        var timeModule = {
            "type": 'time',
            "width": 1,
            "height": 1,
            "xPosition": 5,
            "yPosition": 0
            //"timezone":
        };
        /**
         * @name: addTime()
         * @desc: Calls addModule(module) with the default TimeModule as parameter
         */
        $scope.addTime = function () {
            ModuleModalService.openTimeModal()
              .then(function (viewType) {
                  var module = angular.copy(timeModule);
                  module.viewType = viewType;
                  addModule(module);

                  LiveviewService.persist();
              });
        };

        //********** CALENDAR

        $scope.getAvailableCalendars = function () {
            CalendarService.getAvailableCalendars();
        };
        /**
         * @name: addCalendar()
         * @desc: Calls addModule(module) with the default calendarModule as parameter
         */
         $scope.addCalendar = function () {
             ModuleModalService.openCalendarModal()
               .then(function (calendarIds) {
                   addModule({
                       type: 'calendar',
                       width: 1,
                       height: 2,
                       xPosition: 5,
                       yPosition: 1,
                       calendarIds: calendarIds
                   });

                   LiveviewService.persist();
               });
         };

        /**
         * @name: addWeather()
         * @desc: Calls addModule(module) with the default weatherModule as parameter
         */
        $scope.addWeather = function () {
            ModuleModalService.openWeatherModal()
              .then(function(location) {
                  if ( !location ) {
                      return;
                  }

                  addModule({
                      type: 'weather',
                      width: 2,
                      height: 2,
                      xPosition: 0,
                      yPosition: 0,
                      locationId: location.id
                  });

                  LiveviewService.persist();
              });
        };

        //********** PUBLIC TRANSPORT

        /**
         * @name: addPublicTransport()
         * @desc: Calls addPublicTransport(module) with the default PublicTransportModule as parameter
         */
        $scope.addPublicTransport = function () {
            ModuleModalService.openPublicTransportModal()
                .then(function(results) {
                    if (!results.station || results.products <= 0) {
                        return;
                    }

                    addModule({
                        "type": 'publicTransport',
                        "width": 2,
                        "height": 2,
                        "xPosition": 0,
                        "yPosition": 2,
                        "stationId": results.station.id,
                        "stationName": results.station.name,
                        "products": results.products
                    });

                    LiveviewService.persist();
                });
        };

        /** VOICE CALLBACKS */
        var voiceAddWeather = function () {
            $scope.addWeather();
            $scope.$apply();
        };
        var voiceAddCalendar = function () {
            $scope.addCalendar();
            $scope.$apply();
        };
        var voiceAddTime = function () {
            $scope.addTime();
            $scope.$apply();
        };
        var voiceAddPublicTransport = function () {
            $scope.addPublicTransport();
            $scope.$apply();
        };

        /**
         * Voice Commands
         */
        var commands = {
            "Wetter": voiceAddWeather,
            "Kalender": voiceAddCalendar,
            "Zeit": voiceAddTime,
            "BVG": voiceAddPublicTransport
        };
        annyang.addCommands(commands);

    }]);
