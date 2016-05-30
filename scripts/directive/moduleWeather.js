/**
 * @author Nathalie Junker
 * @name moduleWeather
 * @desc The directive to use when including a weather module into the dashboard.
 * Manages and describes the functioning and structure of a weather module.
 */

angular.module('perna').directive('moduleWeather', ['routes', 
    function( routes ) {
        return {
            restrict: 'E',
            templateURL: routes.weather,
            controller: ['$scope', 'WeatherService',
                function( $scope, WeatherService ){
                    $scope.query = "default";

                    $scope.getLocations = function(){
                        var successCallback = function (response){
                            console.log("locations matched query: ", response);
                            $scope.locationsFound = response.data;
                        };
                        var errorCallback = function (response){
                            console.error(response);
                        };
                        
                        WeatherService.autocompleteCity($scope.query).then(successCallback, errorCallback);
                    };
                }]
            
        };

    
    }
]);