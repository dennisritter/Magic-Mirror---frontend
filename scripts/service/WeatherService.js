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
            var _weatherService = this;
            var deferred = $q.defer();
            $http({
                url: api.city_data.concat(id),
                method: "GET"
            })
                .success(function(response){
                    // _weatherService.locationData = response.data;
                    console.log(response.data);
                    deferred.resolve(response);
                })

                .error(function(response){
                    deferred.reject(response);
                });

            return deferred.promise;
        };
    
    WeatherService.prototype.requestLocation = function() {
        var _weatherService = this;
        var defer = $q.defer();
        $http({
            //was wird hier übergeben? TODO
            url: api.module.concat("228C0E01-7446-6107-A945-96264CAB63D9"),
            method: "GET",
        })
            .success(function(response){
                console.log(response.data);
                _weatherService.locationId = response.data.locationId;
                _weatherService.getWeatherFor(_weatherService.locationId);
                defer.resolve(response);
            })
            .error(function(response){
                defer.reject(response);
            });
        return defer.promise;
    };
        
    return new WeatherService();

    }]);
