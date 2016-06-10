angular.module('perna').controller('LiveviewCtrl', ['$scope', '$window', 'LiveviewService', 'CalendarService', 'WeatherService',
    function ($scope, $window, LiveviewService, CalendarService, WeatherService) {
        
        /**
         * @name: requestLiveview
         * @desc: Request the Liveview after pageload is completed and build it immediatly.
         */
        var requestLiveview = function () {
            var successCallback = function (response) {
                // console.log(response.data);
            };
            var errorCallback = function (response) {
                console.error(response.error);
            };
            angular.element(document).ready(function () {
                LiveviewService.requestLiveview().then(successCallback, errorCallback);
                refreshLiveview();
            });
        };
        requestLiveview();

        /**
         * @name: refreshLiveview
         * @desc: Rebuilds the Liveview after the document is loaded completely
         */
        var refreshLiveview = function () {
            angular.element(document).ready(function () {
                LiveviewService.buildLiveview();
            });
        };

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

        $window.addEventListener("moduleDragged", function(){
            LiveviewService.persist();
        });

        $scope.$watch(function () {
                return LiveviewService.liveview.modules;
            },
            function () {
                $scope.modules = LiveviewService.liveview.modules;
                refreshLiveview();
            });

        // The default timeModule
        var timeModule = {
            "type": 'time',
            "width": 1,
            "height": 1,
            "xPosition": 3,
            "yPosition": 0,
            //"timezone":
        };
        /**
         * @name: addCalendar()
         * @desc: Calls addModule(module) with the default calendarModule as parameter
         */
        $scope.addTime = function () {
            addModule(angular.copy(timeModule));
        };


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

        // The default weatherModule.
        var weatherModule = {
            "type": 'weather',
            "width": 3,
            "height": 1,
            "xPosition": 1,
            "yPosition": 0,
            "locationId" : 0
        };
        
        /**
         * @name: addWeather()
         * @desc: Calls addModule(module) with the default weatherModule as parameter
         */
        $scope.addWeather = function () {
            addModule(angular.copy(weatherModule));
        };

    }]);