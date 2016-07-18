/**
 * @author Dennis Ritter
 * @name modulePublicTransport
 * @desc The directive to use when including a public transport module into the dashboard.
 * Manages and describes the functioning and structure of a public transport module.
 */

angular.module('perna').directive('modulePublicTransport', ['routes', 'PublicTransportService', 'ModuleModalService',
    function (routes, PublicTransportService, ModuleModalService) {
        return {
            restrict: 'E',
            templateUrl: routes.publicTransport,
            scope: {
                module: '='
            },
            controller: ['$scope', 'PublicTransportLocationService', 'LiveviewService',
                function ($scope, PublicTransportLocationService, LiveviewService) {

                    $scope.departures = [];

                    $scope.getDepartures = function () {
                        PublicTransportService.requestDepartures($scope.module.stationId, $scope.module.products)
                          .then(function (departures) {
                              $scope.departures = departures;
                          }, function (response) {
                              console.error(response.error);
                          });
                    };

                    $scope.edit = function () {
                        var station = {
                            id: $scope.module.stationId,
                            name: $scope.module.stationName
                        };
                        var products = $scope.module.products;
                        ModuleModalService.openPublicTransportModal(station, products)
                            .then(function (results) {
                                console.log("results: ", results);
                                $scope.module.stationId = results.station.id;
                                $scope.module.stationName = results.station.name;
                                $scope.module.products = results.products;
                                $scope.getDepartures();
                                LiveviewService.persist();
                            })
                    };

                    $scope.delete = function () {
                        LiveviewService.deleteModule($scope.module);
                    };

                    var initDepartures = function () {
                        if ($scope.module.stationId && $scope.module.products.length > 0) {
                            $scope.getDepartures();
                        }
                    };

                    initDepartures();
                }
            ]
        };
    }]);

angular.module('perna').controller('ModulePublicTransportEditController', ['$q', 'PublicTransportLocationService', '$scope', 'close', 'station', 'products',
    function ($q, PublicTransportLocationService, $scope, close, station, products) {
        $scope.query = '';
        $scope.station = station || null;
        $scope.products = products || [];
        $scope.results = {};

        // Found stations to choose from
        $scope.stations = [];

        $scope.searchStation = function (query) {
            var successCallback = function (response) {
                $scope.stations = response.data;
            };

            var errorCallback = function (response) {
                console.error(response.error);
            };
            PublicTransportLocationService.requestStation(query).then(successCallback, errorCallback);
        };

        $scope.searchSpecificStation = function (stationId) {
            PublicTransportLocationService.requestSpecificStation(stationId)
                .then(function (response) {
                    $scope.setStation(response.data);
                });
        }


        $scope.setStation = function (station) {
            $scope.station = station;
            $scope.availableProducts = station.products;
            //reset products array if station changes
            $scope.products = [];
        };

        $scope.toggleProduct = function (product) {
            var index = $scope.products.indexOf(product);
            if (index > -1) {
                $scope.products.splice(index, 1);
            } else {
                $scope.products.push(product);
            }
            console.log($scope.products);
        };

        $scope.submit = function () {
            // Cancel if no station or product has been selected
            if ($scope.isDisabled()) {
                return;
            }

            // Resolve with station and products
            close({
                station: $scope.station,
                products: $scope.products
            });
        };

        $scope.cancel = function () {
            // Close with -1 to trigger rejection
            close(-1);
        };

        $scope.isDisabled = function () {
            return $scope.station == null || $scope.products.length < 1;
        };

        $scope.initProducts = function () {
            if (station != null) {
                $scope.searchSpecificStation(station.id);
            }
        };
        $scope.initProducts();
    }]);

angular.module('perna').directive('minuteDifference', ['$filter', '$interval', function ($filter, $interval) {
    return {
        restrict: 'A',
        scope: {
            time: '@minuteDifference'
        },
        link: function ($scope, $element) {
            var setMinutes = function () {
                var diff = new Date($scope.time) - new Date(); // difference in milliseconds
                var minutes = Math.ceil(diff / (1000 * 60));
                $element.html(minutes == 0 ? 'jetzt' : 'in ' + minutes + ' min.');
                if ((diff / 1000) <= 20) {
                    $element.parent('li').addClass('is-departing');
                }
            };
            
            var interval = $interval(setMinutes, 1000 * 10);
            setMinutes();

            $scope.$on('$destroy', function () {
                $interval.cancel(interval);
            });
        }
    };
}]);