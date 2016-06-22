/**
* @author Dennis Ritter
* @name PublicTransportLocationService
* @desc A Service which includes functions for getting the users location
* @return An Instance of PublicTransportLocationService
*/

angular.module('perna').service('PublicTransportLocationService', ['$http', '$q', 'api',
function ($http, $q, api) {

    /**
    * @desc Uses the HTML5 geolocation api to get the users coordinates and uses them to return up to 10 examples of nearby cities
    */
    PublicTransportLocationService.prototype.determineUserLocation = function() {
        var defer = $q.defer();

        var options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        };

        function successCallback(response) {
            defer.resolve();
        }

        function errorCallback(response) {
            defer.reject();
        }
        navigator.geolocation.getCurrentPosition(successCallback, errorCallback, options);

        return defer.promise;
    };

    return new PublicTransportLocationService();
}]);
