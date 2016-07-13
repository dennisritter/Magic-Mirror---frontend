/**
 * @author Dennis Ritter
 * @name modulePublicTransport
 * @desc The directive to use when including a public transport module into the dashboard.
 * Manages and describes the functioning and structure of a public transport module.
 */

angular.module('perna').directive('modulePublicTransportNew', ['routes', 'PublicTransportService',
    function( routes, PublicTransportService  ) {
        return {
            restrict: 'E',
            templateUrl: routes.publicTransport,
            scope: {
                'module': '='
            },
            controller: ['$scope', 'PublicTransportLocationService', 'LiveviewService',
                function( $scope, PublicTransportLocationService, LiveviewService ) {


                    $scope.edit = function () {
                        ModuleModalService.openPublicTransportModal( $scope.station, $scope.products )
                            .then(function (results) {
                                $scope.station = results.station;
                                $scope.products = results.products;
                                //get departures
                                LiveviewService.persist();
                            })
                    };

                    $scope.delete = function () {
                        LiveviewService.deleteModule($scope.module);
                    };
                }
            ],
            link: function(scope){

            }
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
            console.log("product: ", product);
            var index = $scope.products.indexOf(product);
            if (index > -1) {
                console.log("removing: ", $scope.products[index]);
                $scope.products.splice(index, 1);
            } else {
                console.log("adding: ", product);
                $scope.products.push(product);
            }
            console.log($scope.products);
        };

    }]);
