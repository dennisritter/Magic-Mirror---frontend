/**
* @author Johannes Ebeling
* @name LocationService
* @desc A Service which includes functions for getting the users location
* @return An Instance of LocationService
*/

angular.module('perna').service('LocationService', ['$http', '$q', 'api',
function ($http, $q, api) {

    var LocationService = function () {
        this.userLocationID = undefined;
    };

    /**
    * @desc Uses the HTML5 geolocation api to get the users coordinates and uses them to return up to 10 examples of nearby cities
    */
    LocationService.prototype.determineUserLocation = function() {
        var locationCoords = navigator.geolocation.getCurrentLocation();
        var deferred = $q.defer();
        $http({
            url : api.weather_nearby,
            method : 'GET',
            params : {
                latitude : locationCoords.latitude,
                longitude : locationCoords.longitude
            }
        })
        .success(function(response){
            defer.resolve(response.data);
        })
        .error(function(response){
            defer.reject(response);
        })
    };

    /**
    * @param A string containing the query
    * @desc Uses the "autocomplete" endpoint to return up to 10 results for the provided query
    */
    LocationService.prototype.provideAutocompleteResults = function(query) {
        var deferred = $q.defer();
        $http({
            url : api.weather_autocomplete,
            method : 'GET',
            params : {
                query : query
            }
        })
        .success(function(response){
            defer.resolve(response.data);
        })
        .error(function(response){
            defer.reject(response);
        })
    };

    /**
    * @param A CityID
    * @desc Sets the userLocationID for later use
    */
    LocationService.prototype.setUserLocationID(id){
        this.userLocationID = id;
    };
    LocationService.prototype.getCityData(id){
        var deferred = $q.defer();
        $http({
            url : api.weather_autocomplete,
            method : 'GET',
            params : {
                query : query
            }
        })
        .success(function(response){
            defer.resolve(response.data);
        })
        .error(function(response){
            defer.reject(response);
        })
    };
    return new LocationService();
}]);
