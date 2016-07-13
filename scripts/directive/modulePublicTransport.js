/**
 * @author Dennis Ritter
 * @name modulePublicTransport
 * @desc The directive to use when including a public transport module into the dashboard.
 * Manages and describes the functioning and structure of a public transport module.
 */

angular.module('perna').directive('modulePublicTransport', ['routes', 'PublicTransportService', 'ModuleModalService',
    function( routes, PublicTransportService, ModuleModalService ) {
        return {
            restrict: 'E',
            templateUrl: routes.publicTransport,
            scope: {
                'module': '='
            },
            controller: ['$scope', 'PublicTransportLocationService', 'LiveviewService',
                function( $scope, PublicTransportLocationService, LiveviewService ) {

                    // $scope.module.stationName = "";
                    // $scope.module.stationId = "";
                    // $scope.module.products = [];
                    $scope.departures = [];

                    $scope.getDepartures = function () {
                        var query = {
                            products: $scope.module.products.join()
                        };

                        var successCallback = function (response) {
                            $scope.departures = response.data;
                        };

                        var errorCallback = function (response) {
                            console.error(response.error);
                        };

                        PublicTransportService.requestDepartures($scope.module.stationId, query).then(successCallback, errorCallback);
                    };

                    $scope.edit = function () {
                        var station = {
                            id: $scope.module.stationId,
                            name: $scope.module.stationName
                        };
                        var products = $scope.module.products;
                        ModuleModalService.openPublicTransportModal( station, products )
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
                        if ( $scope.module.stationId !== "" && $scope.module.products.length > 0) {
                            $scope.getDepartures();
                        }
                    };

                    initDepartures();
                }
            ]
        };
    }]);

angular.module('perna').controller('ModulePublicTransportEditController', ['PublicTransportLocationService', '$scope', 'close', 'station', 'products',
    function (PublicTransportLocationService, $scope, close, station, products) {
        $scope.query = '';
        $scope.station = station;
        $scope.products = products || [];
        $scope.results = {};

        // Found stations to choose from
        $scope.stations = []

        $scope.searchStation = function(query){
            var successCallback = function (response) {
                $scope.stations = response.data;
            };

            var errorCallback = function (response) {
                console.error(response.error);
            };
            PublicTransportLocationService.requestStation(query).then(successCallback, errorCallback);
        };

        $scope.setStation = function(station){
            $scope.station = station;
            $scope.availableProducts = station.products;
        };

        $scope.toggleProduct = function (product) {
            var index = $scope.products.indexOf(product);
            if (index > -1) {
                $scope.products.splice(index, 1);
            } else {
                $scope.products.push(product);
            }
        };

        $scope.submit = function () {
            // Cancel if no station or product has been selected
            if ( $scope.station === null || $scope.products.length <= 0) {
                $scope.cancel();
                return;
            }

            // Resolve with station and products
            close( {
                station: $scope.station,
                products: $scope.products
            } );
        };

        $scope.cancel = function () {
            // Close with -1 to trigger rejection
            close(-1);
        };

    }]);
