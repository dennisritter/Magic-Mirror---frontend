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
            controller: ['$scope', '$element', 'WeatherService', 'LocationService',
                function( $scope, $element, WeatherService, LocationService ){
                    $scope.citySelected = false;
                    $scope.locationsFound = "";
                    $scope.query = "your city here";

                    $scope.getLocations = function(){

                        var successCallback = function (response){
                            $scope.locationsFound = response;
                        };
                        var errorCallback = function (response){
                            console.error(response);
                        };
                        $scope.citySelected = false;
                        LocationService.provideAutocompleteResults($scope.query).then(successCallback, errorCallback);
                    };

                    $scope.locateUser = function(){
                        var successCallback = function (response){
                            $scope.locationsFound = response;
                            $scope.query = "";
                        };
                        var errorCallback = function (response){
                            console.error(response);
                        };

                        clearResults();
                        $scope.query = "get location...";
                        $scope.citySelected = false;

                        LocationService.determineUserLocation().then(successCallback, errorCallback);

                    };

                    $scope.getWeatherData = function(id, location) {

                        $scope.query = location;

                        var successCallback = function (response){
                            $scope.weatherData = response.data;
                            console.log("das hat geklappt. response: ",  $scope.weatherData.current);
                            $scope.citySelected = true;
                        };
                        var errorCallback = function (response ){
                            console.error(response);
                        };

                        WeatherService.getWeatherFor(id).then(successCallback, errorCallback);

                    };
                    
                    var clearResults = function(){
                      $scope.locationsFound = "";
                    };

                    $scope.search = function (query){
                        var successCallback = function (response){
                            $scope.locationsFound = response.data;
                            console.log('hallo', $scope.locationsFound);
                            $scope.citySelected = true;
                        };
                        var errorCallback = function (response){
                            console.error(response);
                        };

                        LocationService.searchGeonames(query).then(successCallback, errorCallback);

                    };

                }]

        };


    }
]);
