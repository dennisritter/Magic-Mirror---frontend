angular.module('perna').controller('LiveviewCtrl', ['$scope', '$window', '$interval', 'LiveviewService', 'CalendarService', 'ReloadService', 'ModuleModalService',
    function ($scope, $window,  $interval, LiveviewService, CalendarService, ReloadService, ModuleModalService) {
        /**
         * @name: requestLiveview
         * @desc: Request the Liveview after pageload is completed and build it immediatly.
         */
        var requestLiveview = function () {
            var successCallback = function (response) {
                console.log(response.data);
            };
            var errorCallback = function (response) {
                console.error(response.error);
            };
            angular.element(document).ready(function () {
                LiveviewService.requestLiveview().then(successCallback, errorCallback);
                refreshLiveview();
                console.log("Refreshed");
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
        console.log(ReloadService);
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
            "xPosition": 3,
            "yPosition": 0
            //"timezone":
        };
        /**
         * @name: addTime()
         * @desc: Calls addModule(module) with the default TimeModule as parameter
         */
        $scope.addTime = function () {
            ModuleModalService.openTimeModal()
              .then(function (viewType) { console.log('lv', viewType);
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

        // The default calendarModule.
        var calendarModule = {
            "type": 'calendar',
            "width": 1,
            "height": 3,
            "xPosition": 0,
            "yPosition": 0,
            "calendarIds": []
        };
        /**
         * @name: addCalendar()
         * @desc: Calls addModule(module) with the default calendarModule as parameter
         */
        $scope.addCalendar = function () {
            $scope.getAvailableCalendars();
            addModule(angular.copy(calendarModule));
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
                      width: 3,
                      height: 1,
                      xPosition: 0,
                      yPosition: 0,
                      locationId: location.id
                  });

                  LiveviewService.persist();
              });
        };

        //********** PUBLIC TRANSPORT

        // The default PublicTransportModule.
        var publicTransportModule = {
            "type": 'publicTransport',
            "width": 3,
            "height": 1,
            "xPosition": 1,
            "yPosition": 2,
            "stationId": "",
            "stationName": "",
            "products": []
        };

        /**
         * @name: addPublicTransport()
         * @desc: Calls addPublicTransport(module) with the default PublicTransportModule as parameter
         */
        $scope.addPublicTransport = function () {
            addModule(angular.copy(publicTransportModule));
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
