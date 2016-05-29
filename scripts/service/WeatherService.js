/**
 * Created by nathalie on 27.05.16.
 */

angular.module('perna').service('WeatherService', ['$http', '$q', 'api',
    function ($http, $q, api) {
    
    var WeatherService = function (){
        this.autocomplCity;
    }
        
    WeatherService.prototype.autocomplete = function ( query, accesstoken ) {
        var _weatherService = this;
        var deferred = $q.defer();
        $http({
            url: api.autocomplete(query, accesstoken),
            method: "GET"
        })
            .success(function(response){
                _weatherService.autocomplCity = response.data;
                deferred.resolve(response);
            })
            .error(function(response){
                deferred.reject(response);
            })

        return deferred.promise;
    };
    
    
    
    
    
    }]);