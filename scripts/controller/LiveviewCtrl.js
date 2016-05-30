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

        var DEFAULT_MODULE = {size: {w: 1, h: 1}, position: {x: 0, y: 0,}, id: 0};
        $scope.$watch(function () {
                return GridService.grid.modules;
            },
            function () {
                $scope.modules = GridService.grid.modules;
            });

        $scope.addModule = function () {
            GridService.addModule(DEFAULT_MODULE);
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

        $scope.addCalendar = function () {
            getCalendars();
            $scope.addModule();
        };


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