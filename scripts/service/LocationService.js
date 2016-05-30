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
            //get LocationID using the html5 geolocation api and perna api
            var locationCoords = ;
            var deferred = $q.defer();
            $http({
                url : api.weather_nearby,
                method : 'GET',
                data : locationCoords
            })
            .success(function(response){
                this.userLocationID = response.id;
                defer.resolve();
            })
            .error(function(response){
                defer.reject(response);
            })
         }

         LocationService.prototype.provideAutocompleteResults = function(query) {
            var deferred = $q.defer();
            $http({
                url : api.weather_autocomplete,
                method : 'GET',
                data : query
            })
            .success(function(response){
                defer.resolve(response.data);
            })
            .error(function(response){
                defer.reject(response);
            })
         }
         return new LocationService();
     }]);
