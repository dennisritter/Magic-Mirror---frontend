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
            templateUrl: routes.weather,
            scope: {
                'module': '='
            },
            controller: ['$scope', 'WeatherService', 'LocationService', 'LiveviewService',
                function( $scope, WeatherService, LocationService, LiveviewService ){

                    //TODO: which of this variables is REALLY necessary?
                    //init with false when it´s possible to persist the location
                    $scope.configMode = true;
                    $scope.citySelected = false;
                    $scope.locationFound = "";
                    $scope.locationsDetected = false;
                    $scope.query = "";
                    $scope.locationId = 0;
                    console.log($scope.locationId);
                    $scope.locationName = "";


                    /**
                     * Locate the user's current location via the browser coordinates and get the
                     * weather data for this location.
                     */
                    $scope.locateUser = function(){
                        $scope.citySelected = false;
                        $scope.locationsDetected = false;

                        var successCallback = function (response){
                            $scope.locationFound = response;
                            $scope.locationId = $scope.locationFound.id;
                            $scope.locationsDetected = true;
                            $scope.query = "";
                            $scope.getWeatherData($scope.locationId, $scope.locationFound.name);
                        };
                        var errorCallback = function (response){
                            console.error(response);
                        };

                        clearResults();
                        $scope.query = "getting location...";

                        LocationService.determineUserLocation().then(successCallback, errorCallback);

                    };

                    /**
                     * Stores all Weather data for the specified ID in the weatherData array.
                     * @param id
                     * @param location
                     */
                    $scope.getWeatherData = function(id, location) {

                        $scope.query = location;

                        $scope.locationId = id;
                        console.log($scope.locationId);
                        var successCallback = function (response){
                            $scope.weatherData = response.data;
                            $scope.citySelected = true;
                            $scope.save();
                        };
                        var errorCallback = function (response ){
                            console.error(response);
                        };

                        WeatherService.getWeatherFor(id).then(successCallback, errorCallback);


                    };
                    
                    $scope.getLocationName = function (id){

                        var successCallback = function (response){
                            $scope.locationName = response.data.name;
                            console.log($scope.locationName);
                            $scope.citySelected = true;
                        };
                        var errorCallback = function (response ){
                            console.error(response);
                        };
                        WeatherService.getLocationName(id).then(successCallback, errorCallback);
                    };
                    
                    var clearResults = function(){
                        $scope.locationFound = "";
                        $scope.locationsDetected = false;
                    };

                    $scope.searchLocation = function (query){
                        var successCallback = function (response){
                            $scope.locationFound = response;
                            $scope.locationsDetected = true;
                            $scope.citySelected = false;
                        };
                        var errorCallback = function (response){
                            console.error(response);
                        };

                        LocationService.searchGeonames(query).then(successCallback, errorCallback);

                    };


                    /**
                     * @deprecated
                     * autocompletion not (yet) supported by search-endpoint.
                     */
                    $scope.getLocations = function(){

                        var successCallback = function (response){
                            $scope.locationFound = response;
                            $scope.locationsDetected = true;
                        };
                        var errorCallback = function (response){
                            console.error(response);
                        };
                        $scope.citySelected = false;
                        LocationService.provideAutocompleteResults($scope.query).then(successCallback, errorCallback);
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
                    scope.getWeatherData(scope.module.locationId, "Berlin");
                    scope.configMode = false;
                }else {
                    scope.configMode = true;
                }
            }
        };
    }]);
