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
            var deferred = $q.defer();
            $http({
                url : api.weather_nearby;
            })
         }

         LocationService.prototype.provideAutocompleteResults = function(query) {
            //get up to 10 LocationID`s for the provided search query and provide them to the calling function
         }
         return new LocationService();
     }]);
