/**
 * @author Nathalie Junker
 * @name moduleWeather
 * @desc The directive to use when including a weather module into the dashboard.
 * Manages and describes the functioning and structure of a we¡ather module.
 */
angular.module('perna').directive('moduleWeather', ['routes', function (routes) {
    return {
        restrict: 'E',
        templateUrl: routes.weather,
        scope: {
            module: '='
        },
        controller: ['$scope', 'WeatherService', 'WeatherLocationService', 'LiveviewService', 'ModuleModalService', 'ReloadService',
            function ($scope, WeatherService, LocationService, LiveviewService, ModuleModalService, ReloadService) {
                $scope.location = null;
                $scope.weatherData = null;

                $scope.edit = function () {
                    ModuleModalService.openWeatherModal($scope.location)
                        .then(function (location) {
                            $scope.location = location;
                            $scope.getWeatherData();
                            $scope.module.locationId = location.id;
                            LiveviewService.persist();
                        });
                };

                $scope.getWeatherData = function () {
                    if (!$scope.location) {
                        return;
                    }

                    WeatherService.getWeatherFor($scope.location.id)
                        .then(function (weatherData) {
                            $scope.weatherData = weatherData.data;
                        })
                        .catch(function (response) {
                            console.error(response);
                        });
                };

                $scope.delete = function () {
                    LiveviewService.deleteModule($scope.module);
                };
                $scope.$on('$destroy', function () {
                    ReloadService.deregister($scope.refreshId);
                });

                var regCallback = function () {
                    if ($scope.module.id) {
                        $scope.refreshId = ReloadService.register($scope.getWeatherData);
                    }
                };
                regCallback();

                var initLocation = function () {
                    if ($scope.module.locationId !== 0) {
                        LocationService.getCityData($scope.module.locationId)
                            .then(function (location) {
                                $scope.location = location;
                                $scope.getWeatherData();
                            });
                    } else {
                        $scope.edit();
                    }
                };

                initLocation();

                this.getWeatherData = function () {
                    return $scope.weatherData;
                };
            }]
    };
}]);

angular.module('perna').controller('ModuleWeatherEditController', ['WeatherLocationService', '$scope', 'close', 'location',
    function (LocationService, $scope, close, location) {
        $scope.query = '';
        $scope.selected = location;
        $scope.results = [];

        $scope.searchLocation = function (query) {
            LocationService.searchGeonames(query)
                .then(function (response) {
                    $scope.results = response;
                })
                .catch(function (error) {
                    console.error(error);
                });
        };

        $scope.locateUser = function () {
            LocationService.determineUserLocation()
                .then(function (location) {
                    // immediately close modal when location has been determined
                    close(location);
                });
        };

        $scope.selectLocation = function (location) {
            $scope.selected = location;
            $scope.submit();
        };

        $scope.cancel = function () {
            // Close with -1 to trigger rejection
            close(-1);
        };

        $scope.submit = function () {
            // Cancel if no location has been selected
            if (!$scope.selected) {
                return;
            }

            // Resolve with selected location
            close($scope.selected);
        };

        $scope.isDisabled = function () {
            return $scope.selected === null;
        };
    }]);

angular.module('perna').directive('weatherIcon', ['$filter', function ($filter) {
    return {
        restrict: 'A',
        scope: {
            code: '=weatherIcon',
            time: '='
        },
        require: '^moduleWeather',
        link: function ($scope, $element, $attr, $module) {
            var dateFormat = $filter('date');
            var oldClasses;

            var setClasses = function (code) {
                var data = $module.getWeatherData();
                var sunrise = parseInt(dateFormat(data.current.sunrise, 'HHmm'));
                var sunset = parseInt(dateFormat(data.current.sunset, 'HHmm'));
                var time = parseInt(dateFormat($scope.time, 'HHmm'));

                var daytime = time < sunrise || time > sunset ? 'night' : 'day';
                var className = 'wi wi-owm-' + daytime + '-' + code;
                $element.removeClass(oldClasses);
                $element.addClass(className);
                oldClasses = className;
            };

            setClasses($scope.code);

            $scope.$watch('code', function (newCode) {
                setClasses(newCode);
            }, true);
        }
    };
}]);