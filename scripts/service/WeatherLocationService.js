/**
* @author Johannes Ebeling
* @name WeatherLocationService
* @desc A Service which includes functions for getting the users location
* @return An Instance of WeatherLocationService
*/

angular.module('perna').service('WeatherLocationService', ['$http', '$q', 'api',
function ($http, $q, api) {

    var WeatherLocationService = function () {
        this.userLocationID = undefined;
    };

    /**
    * @desc Uses the HTML5 geolocation api to get the users coordinates and uses them to return up to 10 examples of nearby cities
    */
    WeatherLocationService.prototype.determineUserLocation = function() {
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

    /**
    * @param id A CityID
    * @desc Retrieves the data for a specified ID
    */
    WeatherLocationService.prototype.getCityData = function(id){
        var defer = $q.defer();
        $http({
            url : api.city_data + id,
            method : 'GET'

        })
        .success(function(response){
            defer.resolve(response.data);
        })
        .error(function(response){
            defer.reject(response);
        });
        return defer.promise;
    };

    /**
    * @param A CityID
    * @desc Sets the userLocationID for later use
    */
    WeatherLocationService.prototype.setUserLocationID = function(id){
        this.userLocationID = id;
    };

    /**
     * @param A string containing the user's query
     * @desc Uses the new search-endpoint that searches for the user-query in geonames.org-api
     */
    WeatherLocationService.prototype.searchGeonames = function(query){
        var defer = $q.defer();
        $http({
            url : api.city_search,
            method : 'GET',
            params : { query : query }
        })
            .success(function(response){
                defer.resolve(response.data);
            })
            .error(function(response){
                defer.reject(response);
            });
        return defer.promise;

    };
    return new WeatherLocationService();
}]);
