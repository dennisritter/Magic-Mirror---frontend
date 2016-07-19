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

                    /**
                     * @name getDepartures()
                     * @desc Fetching the departures for the defined station and selected products
                     */
                    $scope.getDepartures = function () {
                        PublicTransportService.requestDepartures($scope.module.stationId, $scope.module.products)
                          .then(function (departures) {
                              $scope.departures = departures;
                          }, function (response) {
                              console.error(response.error);
                          });
                    };

                    /**
                     * @name edit()
                     * @desc Opening a PublicTransportModal with the necessary parameters and assigning data to the PublicTransport module afterwards
                     */
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

                    /**
                     * @name delete()
                     * @desc Removes the module
                     */
                    $scope.delete = function () {
                        LiveviewService.deleteModule($scope.module);
                    };

                    /**
                     * @name initDepartures
                     * @desc Fetching the departures. Called once when the module is initialized.
                     */
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

        // available stations the user can choose from
        $scope.stations = [];

        /**
         * @name searchStation()
         * @desc Fetching stations based on the query String
         * @param query   -   A location name String
         */
        $scope.searchStation = function (query) {
            var successCallback = function (response) {
                $scope.stations = response.data;
            };

            var errorCallback = function (response) {
                console.error(response.error);
            };
            PublicTransportLocationService.requestStation(query).then(successCallback, errorCallback);
        };

        /**
         * @name seachSpecificStation()
         * @desc Fetches a specific station by the given stationId
         * @param stationId     -   The unique id of a station
         */
        $scope.searchSpecificStation = function (stationId) {
            PublicTransportLocationService.requestSpecificStation(stationId)
                .then(function (response) {
                    $scope.setStation(response.data);
                });
        }

        /**
         * @name setStation()
         * @desc Assigns a station to the station Attribute of the modal
         * @param station   -   a station object including the stations name and its id
         *                      {name, id}
         */
        $scope.setStation = function (station) {
            $scope.station = station;
            $scope.availableProducts = station.products;
            //reset products array if station changes
            $scope.products = [];
        };

        /**
         * @name toggleProduct()
         * @desc Toggles a product in the productarray (Removes or adds it).
         * @param product   -   A public transport vehicle
         */
        $scope.toggleProduct = function (product) {
            var index = $scope.products.indexOf(product);
            if (index > -1) {
                $scope.products.splice(index, 1);
            } else {
                $scope.products.push(product);
            }
            console.log($scope.products);
        };

        /**
         * @name Submit()
         * @desc Submits the data set in the modal, closes the modal and returns the desired data to the module.
         */
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

        /**
         * @name cancel()
         * @desc Discards all changes and closes the modal.
         */
        $scope.cancel = function () {
            // Close with -1 to trigger rejection
            close(-1);
        };

        /**
         * @name isDisabled()
         * @desc checks whether the user set the necessary options to Submit them
         * @returns {boolean}
         */
        $scope.isDisabled = function () {
            return $scope.station == null || $scope.products.length < 1;
        };

        /**
         * @name initProducts()
         * @desc Fetches the available products if a station is present in the modal parameters.
         */
        $scope.initProducts = function () {
            if (station != null) {
                $scope.searchSpecificStation(station.id);
            }
        };
        // Call on modal initialization to precheck the current users products settings for this station
        $scope.initProducts();
    }]);

/**
 * @name minuteDifference
 * @desc A Directive to check and show the time difference between now and the departure time of products in minutes.
 */
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