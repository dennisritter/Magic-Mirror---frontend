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

                    /**
                     * Searches for a location which fits the query and stores the found location in the
                     * locationFound-variable.
                     * @param query  The query.
                     */
                    $scope.searchLocation = function (query){
                        var successCallback = function (response){
                            $scope.locationFound = response;
                            $scope.locationsDetected = true;
                        };
                        var errorCallback = function (response){
                            console.error(response);
                        };

                        PublicTransportLocationService.searchGeonames(query).then(successCallback, errorCallback);

                    };

                    var persist = function(){
                        LiveviewService.persist();
                    };

                    $scope.save = function () {
                        $scope.module.locationId = $scope.locationId;
                        console.log($scope.module);
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
                }],
            link: function(scope){
                if(scope.module.locationId !== 0){
                    scope.getLocationName(scope.module.locationId);
                    scope.configMode = false;
                }else {
                    scope.configMode = true;
                }
            }
        };
    }]);
