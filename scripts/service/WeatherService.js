/**
 * Created by nathalie on 27.05.16.
 */

angular.module('perna').service('WeatherService', ['$http', '$q', 'api',
    function ($http, $q, api) {

    var WeatherService = function (){
        this.locationFound = [];
        this.weatherData = [];
        this.locationId = 0;
        this.locationData = [];
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

        WeatherService.prototype.getLocationName = function (id){
            var deferred = $q.defer();
            $http({
                url: api.city_data.concat(id),
                method: "GET"
            })
                .success(function(response){
                    deferred.resolve(response);
                })

                .error(function(response){
                    deferred.reject(response);
                });

            return deferred.promise;
        };
        
    return new WeatherService();

    }]);
