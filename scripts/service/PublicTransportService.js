/**
 * @author Dennis Ritter
 * @name PublicTransportService
 */

angular.module('perna').service('PublicTransportService', ['$http', '$q', 'api',
    function ($http, $q, api) {

        var PublicTransportService = function () {
        };

        PublicTransportService.prototype.requestDepartures = function(stationId, query){
            var defer = $q.defer();

            $http({
                url: api.departures + stationId,
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


        return new PublicTransportService();
    }]);
