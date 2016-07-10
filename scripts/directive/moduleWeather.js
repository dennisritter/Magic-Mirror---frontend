/**
 * @author Nathalie Junker
 * @name moduleWeather
 * @desc The directive to use when including a weather module into the dashboard.
 * Manages and describes the functioning and structure of a weather module.
 */

angular.module('perna').directive('moduleWeather2', ['routes',
    function( routes ) {
        return {
            restrict: 'E',
            templateUrl: routes.weather,
            scope: {
                'module': '='
            },
            controller: ['$scope', 'WeatherService', 'LocationService', 'LiveviewService', 'PernaModalService',
                function( $scope, WeatherService, LocationService, LiveviewService, PernaModalService ){

                    //TODO: which of these variables are REALLY necessary?
                    //init with false when it´s possible to persist the location
                    $scope.configMode = true;
                    $scope.citySelected = false;
                    $scope.locationFound = "";
                    $scope.locationsDetected = false;
                    $scope.query = "";
                    $scope.locationId = 0;
                    $scope.locationName = "";

                    var editController = ['LocationService', 'module', '$scope', 'templateUrl', 'close', function ( LocationService, module, $scope, templateUrl, close ) {
                        $scope.moduleData = module;
                        $scope.templateUrl = templateUrl;

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
                         * Searches for a location which fits the query and stores the found location in the
                         * locationFound-variable.
                         * @param query  The query.
                         */
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

                        $scope.submit = function () {
                            close('success!', 500);
                        };

                        $scope.cancel = function () {
                            close('cancelled :(', 500);
                        };
                    }];

                    $scope.showYesNo = function() {
                        PernaModalService.showModal({
                            templateUrl: 'directive/modules/module-weather-edit.html',
                            controller: editController,
                            inputs: {
                                module: $scope.module
                            }
                        })
                          .then(function (modal) {console.log('modal', modal);});
                    };


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

                        WeatherLocationService.determineUserLocation().then(successCallback, errorCallback);

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


                    /**
                     * Pushes the Name of a specific location Id in the $scope.locationName variable
                     * and calls the getWeatherData method.
                     * @param id
                     */
                    $scope.getLocationName = function (id){

                        var successCallback = function (response){
                            $scope.locationName = response.data.name;
                            $scope.getWeatherData(id, $scope.locationName);
                        };
                        var errorCallback = function (response ){
                            console.error(response);
                        };
                        WeatherService.getLocationName(id).then(successCallback, errorCallback);

                    };

                    /**
                     * Clears the inputfield
                     */
                    var clearResults = function(){
                        $scope.locationFound = "";
                        $scope.locationsDetected = false;
                    };

                    /**
                     * Searches for a location which fits the query and stores the found location in the
                     * locationFound-variable.
                     * @param query  The query.
                     */
                    $scope.searchLocation = function (query){
                        var successCallback = function (response){
                            $scope.locationFound = response;
                            $scope.locationsDetected = true;
                            $scope.citySelected = false;
                        };
                        var errorCallback = function (response){
                            console.error(response);
                        };

                        WeatherLocationService.searchGeonames(query).then(successCallback, errorCallback);

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
                        WeatherLocationService.provideAutocompleteResults($scope.query).then(successCallback, errorCallback);
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
