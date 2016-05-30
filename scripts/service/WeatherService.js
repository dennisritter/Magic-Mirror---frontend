/**
 * Created by nathalie on 27.05.16.
 */

angular.module('perna').service('WeatherService', ['$http', '$q', 'api',
    function ($http, $q, api) {
    
    var WeatherService = function (){
        this.locationsFound = [];
    };

        //testcommit

        
    WeatherService.prototype.autocompleteCity = function ( query, accesstoken ) {
        var _weatherService = this;
        var deferred = $q.defer();
        $http({
            url: api.weather_autocomplete,
            method: "GET",
            params: {query: query}
        })
            .success(function(response){
                _weatherService.locationsFound = response.data;
                deferred.resolve(response);
            })
            .error(function(response){
                deferred.reject(response);
            });

        return deferred.promise;
    };
   
    return new WeatherService();
    
    }]);