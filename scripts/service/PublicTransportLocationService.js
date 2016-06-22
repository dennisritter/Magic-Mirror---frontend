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

        function success(pos) {
            var crd = pos.coords;

            $http({
                url : api.weather_nearby,
                method : 'GET',
                params : {
                    latitude : crd.latitude,
                    longitude : crd.longitude
                }
            })
            .success(function(response){
                defer.resolve(response.data);
            })
            .error(function(response){
                defer.reject(response);
            });
        }

        function error(err) {
            console.warn('ERROR(' + err.code + '): ' + err.message);
            defer.reject(response);
        }
        navigator.geolocation.getCurrentPosition(success, error, options);

        return defer.promise;
    };
    
    return new PublicTransportLocationService();
}]);
