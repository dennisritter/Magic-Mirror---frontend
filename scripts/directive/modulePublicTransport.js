/**
 * @author Dennis Ritter
 * @name modulePublicTransport
 * @desc The directive to use when including a public transport module into the dashboard.
 * Manages and describes the functioning and structure of a public transport module.
 */

angular.module('perna').directive('modulePublicTransport', ['routes',
    function( routes  ) {
        return {
            restrict: 'E',
            templateUrl: routes.publicTransport,
            scope: {
                'module': '='
            },
            controller: ['$scope', 'PublicTransportLocationService', 'LiveviewService',
                function( $scope, PublicTransportLocationService, LiveviewService ){

                    $scope.configMode = true;

                    $scope.locations = [];
                    $scope.locationsDetected = false;
                    $scope.locationSelected = false;

                    var persist = function(){
                        console.log(LiveviewService.liveview.modules);
                        LiveviewService.persist();
                    };

                    $scope.getStations = function(query){
                        var successCallback = function(response){
                            $scope.locations = response.data;
                            $scope.locationsDetected = true;
                        };

                        var errorCallback = function(response){
                            console.error(response.error);
                        };
                        PublicTransportLocationService.requestStation(query).then(successCallback, errorCallback);
                    };

                    $scope.getStationInfo = function(locationId, locationName){
                        $scope.module.stationId = locationId;
                        $scope.module.stationName = locationName;
                        $scope.locationSelected = true;
                        console.log($scope.module);
                    };


                    $scope.getUserLocation = function(){
                        console.log("Get Userlocation");
                        var successCallback = function(response){
                            // console.log("getUserLocation() success-response: ", response)
                        };

                        var errorCallback = function(response){
                            console.error("getUserLocation() error-response: ", response);
                        };
                        PublicTransportLocationService.determineUserLocation().then(successCallback, errorCallback);
                    };

                    $scope.save = function () {
                        $scope.configMode = false;
                        persist();
                    };

                    $scope.edit = function () {
                        $scope.configMode = true;
                    };

                    $scope.delete = function(){
                        var successCallback = function(){
                            console.log("Deleted module: ", $scope.module);
                        };
                        var errorCallback = function(response){
                            console.error("deleteModuleError: ", response);
                        };
                        LiveviewService.deleteModule($scope.module).then(successCallback, errorCallback);
                    };
                }]
            //link:
        };
    }]);
