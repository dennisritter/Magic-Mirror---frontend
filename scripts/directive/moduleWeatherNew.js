/**
 * @author Nathalie Junker
 * @name moduleWeather
 * @desc The directive to use when including a weather module into the dashboard.
 * Manages and describes the functioning and structure of a weather module.
 */
angular.module('perna').directive('moduleWeather', ['routes', function (routes) {
  return {
    restrict: 'E',
    templateUrl: routes.weather,
    scope: {
      module: '='
    },
    controller: ['$scope', 'WeatherService', 'LocationService', 'LiveviewService', 'PernaModalService',
      function ($scope, WeatherService, LocationService, LiveviewService, PernaModalService) {
        $scope.location = null;
        $scope.weatherData = null;

        /**
         * Controller for edit section in modal.
         * May be a controller constructor or a registered controller name,
         * if you want to separate the controllers into multiple files.
         *
         * templateUrl must be assigned to $scope.templateUrl
         * close is a function for closing the modal
         * both must be required via dependency injection
         */
        var editController = ['LocationService', '$scope', 'templateUrl', 'close',
          function (LocationService, $scope, templateUrl, close) {
            $scope.templateUrl = templateUrl;
            $scope.query = '';
            $scope.selected = null;
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
                  close( location );
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
              if ( $scope.selected == null ) {
                $scope.cancel();
                return;
              }

              // Resolve with selected location
              close( $scope.selected );
            };
          }];

        $scope.edit = function () {
          /**
           * Modal I/O
           *
           * You may provide a key/value hash as 'inputs' in the options,
           * inputs will be injected into your controller if you require them.
           * e.g.:
           * inputs: {
           *  moduleData: $scope.module
           * }
           * can be accessed in your controller's dependencies as 'moduleData'.
           * As output you may use the first parameter of the 'close' function.
           *
           * showModal returns a promise resolving with the data passed to the 'close' function.
           * the promise rejects with no data when passing -1 to 'close'
           */
          PernaModalService.showModal({
            controller: editController,
            templateUrl: 'directive/modules/module-weather-edit.html'
          })
            .then(function (location) {
              $scope.location = location;
              $scope.getWeatherData();
              $scope.module.locationId = location.id;
              LiveviewService.persist();
            })
        };

        $scope.getWeatherData = function () {
          if ( !$scope.location ) {
            return;
          }

          WeatherService.getWeatherFor( $scope.location.id )
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

        var initLocation = function () {
          if ( $scope.module.locationId !== 0 ) {
            LocationService.getCityData( $scope.module.locationId )
              .then(function (location) {
                $scope.location = location;
                $scope.getWeatherData();
              });
          } else {
            $scope.edit();
          }
        };

        initLocation();
      }]
  };
}]);