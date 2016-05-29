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

         return new LocationService();
     }]);
