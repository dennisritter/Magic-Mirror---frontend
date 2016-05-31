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
            this.userLocationID = response.id;
            defer.resolve();
        })
        .error(function(response){
            defer.reject(response);
        })
    };

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
    return new LocationService();
}]);
