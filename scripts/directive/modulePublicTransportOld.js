/**
 * @author Dennis Ritter
 * @name modulePublicTransport
 * @desc The directive to use when including a public transport module into the dashboard.
 * Manages and describes the functioning and structure of a public transport module.
 */

angular.module('perna').directive('modulePublicTransportOld', ['routes', 'PublicTransportService',
    function( routes, PublicTransportService  ) {
        return {
            restrict: 'E',
            templateUrl: routes.publicTransport,
            scope: {
                'module': '='
            },
            controller: ['$scope', 'PublicTransportLocationService', 'LiveviewService',
                function( $scope, PublicTransportLocationService, LiveviewService ) {

                    $scope.configMode = false;

                    $scope.stations = [];
                    $scope.stationsDetected = false;
                    $scope.selectedProducts = {
                        "S-Bahn": false,
                        "Tram": false,
                        "U-Bahn": false,
                        "Bus": false,
                        "Regionalbahn": false,
                        "Fähre": false
                    };

                    var persist = function () {
                        console.log(LiveviewService.liveview.modules);
                        LiveviewService.persist();
                    };

                    $scope.getStations = function (query) {
                        var successCallback = function (response) {
                            $scope.stations = response.data;
                            $scope.stationsDetected = true;
                        };

                        var errorCallback = function (response) {
                            console.error(response.error);
                        };
                        PublicTransportLocationService.requestStation(query).then(successCallback, errorCallback);
                    };

                    $scope.getStationInfo = function (stationId, stationName, stationProducts) {
                        $scope.module.stationId = stationId;
                        $scope.module.stationName = stationName;
                        $scope.stationProducts = stationProducts;
                        $scope.stationProductsLabels = $scope.getStationProductsLabels();
                        $scope.stationSelected = true;
                    };

                    $scope.getStationProductsLabels = function () {
                        var stationProductLabels = [];
                        for (var i = 0; i < $scope.stationProducts.length; i++) {
                            switch ($scope.stationProducts[i]) {
                                case("S"):
                                    stationProductLabels.push("S-Bahn");
                                    break;
                                case("T"):
                                    stationProductLabels.push("Tram");
                                    break;
                                case("U"):
                                    stationProductLabels.push("U-Bahn");
                                    break;
                                case("B"):
                                    stationProductLabels.push("Bus");
                                    break;
                                case("RE"):
                                    stationProductLabels.push("Regionalbahn");
                                    break;
                                case("F"):
                                    stationProductLabels.push("Fähre");
                                    break;
                                default:
                                    stationProductLabels.push("Unbekannt");
                                    break;
                            }
                        }
                        return stationProductLabels;
                    };

                    var getSelectedProductsString = function () {
                        var products = [];
                        if ($scope.selectedProducts["S-Bahn"]) products.push("S");
                        if ($scope.selectedProducts["Tram"]) products.push("T");
                        if ($scope.selectedProducts["U-Bahn"]) products.push("U");
                        if ($scope.selectedProducts["Bus"]) products.push("B");
                        if ($scope.selectedProducts["Regionalbahn"]) products.push("RE");
                        if ($scope.selectedProducts["Fähre"]) products.push("F");
                        $scope.module.products = products;
                        console.log("selected products: ", $scope.module.products);
                    };

                    $scope.getDepartures = function () {
                        if($scope.configMode){
                            getSelectedProductsString();
                        }
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

                    $scope.getUserLocation = function () {
                        console.log("Get Userlocation");
                        var successCallback = function (response) {
                            // console.log("getUserLocation() success-response: ", response)
                        };

                        var errorCallback = function (response) {
                            console.error("getUserLocation() error-response: ", response);
                        };
                        PublicTransportLocationService.determineUserLocation().then(successCallback, errorCallback);
                    };

                    $scope.save = function () {
                        $scope.getDepartures();
                        $scope.configMode = false;
                        persist();
                    };

                    $scope.edit = function () {
                        $scope.configMode = true;
                    };

                    $scope.delete = function () {
                        var successCallback = function () {
                            console.log("Deleted module: ", $scope.module);
                        };
                        var errorCallback = function (response) {
                            console.error("deleteModuleError: ", response);
                        };
                        LiveviewService.deleteModule($scope.module).then(successCallback, errorCallback);
                    };
                }
            ],
            link: function(scope){
                console.log("The damn module: ", scope.module);
                if(scope.module.products.length > 0){
                    scope.getDepartures();
                }else {
                    scope.configMode = true;
                }
            }
        };
    }]);
