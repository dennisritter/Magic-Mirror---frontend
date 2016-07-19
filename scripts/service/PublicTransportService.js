/**
 * @author Dennis Ritter
 * @name PublicTransportService
 */

angular.module('perna').service('PublicTransportService', ['$http', '$q', 'api',
    function ($http, $q, api) {

        var PublicTransportService = function () {
        };

        /**
         * Fetches Departures
         * @param   stationId   The id of the station
         * @param   products    array of products
         * @returns {Promise}
         */
        PublicTransportService.prototype.requestDepartures = function(stationId, products){
            var defer = $q.defer();

            $http({
                url: api.departures + stationId,
                method: 'GET',
                params: {
                    products: products.join(',')
                }
            })
                .success(function (response) {
                    defer.resolve(response.data);
                })
                .error(function (response) {
                    defer.reject(response);
                });
            return defer.promise;
        };


        return new PublicTransportService();
    }]);
