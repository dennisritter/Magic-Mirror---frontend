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
            scope: {
                'module': '='
            },
            controller: ['$scope', '$element', 'WeatherService', 'LocationService', 'LiveviewService',
                function( $scope, $element, WeatherService, LocationService, LiveviewService ){
                    //init with false when it´s possible to persist the location
                    $scope.configMode = true;
                    $scope.citySelected = false;
                    $scope.locationsFound = "";
                    $scope.locationsDetected = false;
                    $scope.query = "your city here";

                    $scope.locateUser = function(){
                        $scope.citySelected = false;
                        $scope.locationsDetected = false;

                        var successCallback = function (response){
                            $scope.locationsFound = response;
                            $scope.locationsDetected = true;
                            $scope.query = "";
                            $scope.getWeatherData($scope.locationsFound.id, $scope.locationsFound.name);
                        };
                        var errorCallback = function (response){
                            console.error(response);
                        };

                        clearResults();
                        $scope.query = "getting location...";

                        LocationService.determineUserLocation().then(successCallback, errorCallback);


                    };

                    $scope.getWeatherData = function(id, location) {

                        $scope.query = location;

                        var successCallback = function (response){
                            $scope.weatherData = response.data;
                            $scope.citySelected = true;
                        };
                        var errorCallback = function (response ){
                            console.error(response);
                        };

                        WeatherService.getWeatherFor(id).then(successCallback, errorCallback);

                    };
                    
                    var clearResults = function(){
                        $scope.locationsFound = "";
                        $scope.locationsDetected = false;
                    };

                    $scope.searchLocation = function (query){
                        var successCallback = function (response){
                            $scope.locationsFound = response;
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
                            $scope.locationsFound = response;
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

        };


    }
]);
