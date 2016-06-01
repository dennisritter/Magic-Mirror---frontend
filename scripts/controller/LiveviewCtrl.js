angular.module('perna').controller('LiveviewCtrl', ['$scope', 'GridService', 'CalendarService',
    function ($scope, GridService, CalendarService) {

        /**
         * @desc: Load the Grid after pageload is completed.
         */
        var refreshGrid = function () {
            angular.element(document).ready(function () {
                GridService.buildGrid();
            });
        };
        refreshGrid();

        $scope.modules = [];

        $scope.$watch(function () {
                return GridService.grid.modules;
            },
            function () {
                $scope.modules = GridService.grid.modules;
            });

        var addModule = function (module) {
            GridService.addModule(module);
            refreshGrid();
        };

        var getCalendars = function () {
            var successCallback = function (response) {
                console.log("Loaded available Calendars");
            };
            var errorCallback = function (response) {
                console.error(response.error);
            };
            CalendarService.getCalendars().then(successCallback, errorCallback);
        };

        var defaultModule = {size: {w: 1, h: 1}, position: {x: 0, y: 0,}, type: 'naked'};
        $scope.addDefaultModule = function () {
            addModule(defaultModule);
        };

        var calendarModule = {size: {w: 1, h: 3}, position: {x: 0, y: 0,}, type: 'calendar'};
        $scope.addCalendar = function () {
            getCalendars();
            addModule(calendarModule);
        };

        // var weatherModule = {size: {w: 1, h: 3}, position: {x: 0, y: 0,}, type: 'calendar'};
        // $scope.addWeather = function () {
        //     getCalendars();
        //     addModule(calendarModule);
        // };


        /*
         * jQuery Methode, aus der Bibliothek kopiert, sie stellt die Resize-Funktion
         * für jedes Item zur Verfügung.
         * */
        $('#grid li .resize').click(function (e) {
            e.preventDefault();
            var itemElement = $(e.currentTarget).closest('li'),
                itemWidth = $(e.currentTarget).data('w'),
                itemHeight = $(e.currentTarget).data('h');

            $('#grid').gridList('resizeItem', itemElement, {
                w: itemWidth,
                h: itemHeight
            });
        });

    }]);