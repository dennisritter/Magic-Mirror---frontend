/**
 * @author Nathalie Junker
 * @name moduleWeather
 * @desc The directive to use when including a weather module into the dashboard.
 * Manages and describes the functioning and structure of a weather module.
 */

angular.module('perna').directive('moduleWeather', ['routes',
    function( routes  ) {
        return {
            restrict: 'E',
            templateURL: routes.weather,
            controller: ['$scope', 'WeatherService',
                function( $scope, WeatherService ){
                    $scope.query = "city";
                    $scope.citySelected = false;
                    $scope.getLocations = function(){

                        var successCallback = function (response){
                            $scope.locationsFound = response.data;
                        };
                        var errorCallback = function (response){
                            console.error(response);
                        };
                        
                        WeatherService.autocompleteCity($scope.query).then(successCallback, errorCallback);
                    };

                    $scope.getWeatherData = function(id, location) {

                        $scope.location = location;
                        
                        var successCallback = function (response){
                            $scope.weatherData = response.data;
                            console.log("das hat geklappt. response: " + $scope.weatherData.daily[0].temperature.average.toString());
                            $scope.citySelected = true;
                        };
                        var errorCallback = function (response ){
                            console.error(response);
                        };

                        WeatherService.getWeatherFor(id).then(successCallback, errorCallback);

                    };   
                    
                }]
            
        };

    
    }
]);