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

                    var persist = function(){
                        console.log(LiveviewService.liveview.modules);
                        LiveviewService.persist();
                    };

                    $scope.getStation = function(query){
                        var successCallback = function(response){
                            console.log("getStation result: ", response);
                            $scope.module.stationId = response.data[0].id;
                            $scope.module.stationName = response.data[0].name;
                            console.log($scope.module);
                        };

                        var errorCallback = function(response){
                            console.error(response.error);
                        };
                        PublicTransportLocationService.requestStation(query).then(successCallback, errorCallback);
                    };


                    $scope.getUserLocation = function(){
                        console.log("Get Userlocation");
                        var successCallback = function(response){
                            // console.log("getUserLocation() success-response: ", response)
                        };

                        var errorCallback = function(response){
                            console.error("getUserLocation() error-response: ", response)
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
