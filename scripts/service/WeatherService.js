/**
 * Created by nathalie on 27.05.16.
 */

angular.module('perna').service('WeatherService', ['$http', '$q', 'api',
    function ($http, $q, api) {

    var WeatherService = function (){
        this.locationsFound = [];
        this.weatherData = [];
    };

    WeatherService.prototype.getWeatherFor = function (locationId) {
        var _weatherService = this;
        var deferred = $q.defer();
        $http({
            url: api.weather_getWeather.concat(locationId),
            method: "GET"
        })
            .success(function(response){
                _weatherService.weatherData = response.data;
                deferred.resolve(response);
            })

            .error(function(response){
                deferred.reject(response);
            });

        return deferred.promise;

    };

    return new WeatherService();

    }]);
