/**
 * @author Dennis Ritter
 * @name PublicTransportLocationService
 * @desc A Service which includes functions for getting the users location
 * @return An Instance of PublicTransportLocationService
 */

angular.module('perna').service('PublicTransportLocationService', ['$http', '$q', 'api',
    function ($http, $q, api) {

        var PublicTransportLocationService = function () {
        };


        PublicTransportLocationService.prototype.requestStation = function (query) {
            var defer = $q.defer();

            $http({
                url: api.stations_search,
                method: 'GET',
                params: {
                    query: query
                }
            })
                .success(function (response) {
                    defer.resolve(response);
                })
                .error(function (response) {
                    defer.reject(response);
                });
            return defer.promise;
        };

        /**
         *  note: Need improved nearby search if using it for publicTransport
         **/
        PublicTransportLocationService.prototype.determineUserLocation = function () {
            var defer = $q.defer();

            var options = {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            };

            var _PublicTransportLocationService = this;
            var successCallback = function(response) {
                _PublicTransportLocationService.getNearbyLocation(response.coords.latitude, response.coords.longitude);
                defer.resolve(response);
            };

            var errorCallback = function(response) {
                defer.reject(response);
            };

            navigator.geolocation.getCurrentPosition(successCallback, errorCallback, options);
            return defer.promise;
        };

        PublicTransportLocationService.prototype.getNearbyLocation = function (lat, lng) {
            var successCallback = function (response) {

            };

            var errorCallback = function (response) {
                console.error("getNearbyLocation() error: ", response);
            };

            this.requestNearbyLocation(lat, lng).then(successCallback, errorCallback);
        };

        PublicTransportLocationService.prototype.requestNearbyLocation = function (lat, lng) {
            var defer = $q.defer();

            $http({
                url: api.weather_nearby,
                method: 'GET',
                params: {
                    latitude: lat,
                    longitude: lng
                }
            })
                .success(function (response) {
                    defer.resolve(response);
                })
                .error(function (response) {
                    defer.reject(response);
                });
            return defer.promise;
        };

        return new PublicTransportLocationService();
    }]);
