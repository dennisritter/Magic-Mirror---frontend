angular.module('perna').controller('LiveviewCtrl', ['$scope', 'LiveviewService', 'CalendarService',
    function ($scope, LiveviewService, CalendarService) {

        /**
         * @desc: Load the Liveview after pageload is completed.
         */
        var refreshLiveview = function () {
            angular.element(document).ready(function () {
                LiveviewService.buildLiveview();
            });
        };
        refreshLiveview();

        $scope.modules = [];

        $scope.$watch(function () {
                return LiveviewService.liveview.modules;
            },
            function () {
                $scope.modules = LiveviewService.liveview.modules;
                // console.log("Current Liveview Modules: ", LiveviewService.liveview.modules);
            });

        var addModule = function (module) {
            LiveviewService.addModule(module);
            refreshLiveview();
        };

        var getAvailableCalendars = function () {
            var successCallback = function (response) {
                // console.log("Loaded available Calendars");
            };
            var errorCallback = function (response) {
                console.error(response.error);
            };
            CalendarService.getCalendars().then(successCallback, errorCallback);
        };

        var defaultModule = {size: {w: 1, h: 1}, position: {x: 0, y: 0,}, type: 'naked', typeData: {}};
        $scope.addDefaultModule = function () {
            addModule(defaultModule);
        };

        var calendarModule = {size: {w: 1, h: 3}, position: {x: 0, y: 0,}, type: 'calendar', typeData: { calendarIds: [] }};
        $scope.addCalendar = function () {
            getAvailableCalendars();
            addModule(  angular.copy(calendarModule) );
        };

        // var weatherModule = {size: {w: 1, h: 3}, position: {x: 0, y: 0,}, type: 'calendar', typeData: {}};
        // $scope.addWeather = function () {
        //     getCalendars();
        //     addModule(calendarModule);
        // };

    }]);