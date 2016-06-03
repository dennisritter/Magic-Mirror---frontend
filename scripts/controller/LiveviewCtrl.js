angular.module('perna').controller('LiveviewCtrl', ['$scope', 'LiveviewService', 'CalendarService',
    function ($scope, LiveviewService, CalendarService) {

        /**
         * @desc: Load the Liveview after pageload is completed.
         */
        var requestLiveview = function () {
            var successCallback = function (response) {
                LiveviewService.unpackLiveviewData(angular.copy(response.data));
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

        var refreshLiveview = function () {
            angular.element(document).ready(function () {
                LiveviewService.buildLiveview();
            });
        };

        $scope.modules = [];

        //Wieso watcht der watch-task nicht "richtig" (nach LiveviewService.unpackLiveviewData)?
        $scope.$watch(function () {
                return LiveviewService.liveview.modules;
            },
            function () {
                $scope.modules = LiveviewService.liveview.modules;
                console.log("$watch Callback for liveview.modules: ", LiveviewService.liveview.modules);
                refreshLiveview();
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

        // var calendarModule = {
        //     id: 0,
        //     size: {w: 1, h: 3},
        //     position: {x: 0, y: 0,},
        //     type: 'calendar',
        //     typeData: {calendarIds: []}
        // };
        $scope.addCalendar = function () {
            getAvailableCalendars();
            addModule(angular.copy(calendarModule));
        };

        // var weatherModule = {size: {w: 1, h: 3}, position: {x: 0, y: 0,}, type: 'calendar', typeData: {}};
        // $scope.addWeather = function () {
        //     getCalendars();
        //     addModule(calendarModule);
        // };

    }]);