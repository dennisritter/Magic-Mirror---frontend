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
                    $scope.query = "city";
                    $scope.idLoc;
                    $scope.locationSelected = "";

                    $scope.getLocations = function(){

                        //check if query !> 3

                        var successCallback = function (response){
                            $scope.locationsFound = response.data;
                        };
                        var errorCallback = function (response){
                            console.error(response);
                        };
                        
                        WeatherService.autocompleteCity($scope.query).then(successCallback, errorCallback);
                    };

                    $scope.getWeatherData = function() {

                        var successCallback = function (response){
                            console.log("das hat geklappt. response: " + response);
                            $scope.weatherData = response.data;
                        };
                        var errorCallback = function (response ){
                            console.error(response);
                        };

                        WeatherService.getWeatherFor(12345).then(successCallback, errorCallback);

                    };

                    $scope.printLoc = function(id) {
                        console.log("the id is: " + id);
                    };

                    $scope.setId = function(id) {
                        console.log(id);
                    };
                }]
            
        };

    
    }
]);