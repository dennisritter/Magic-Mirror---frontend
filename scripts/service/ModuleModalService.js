angular.module('perna').service('ModuleModalService', ['PernaModalService', 'GoogleAuthService', '$q',
  function (PernaModalService, GoogleAuthService, $q) {
  
  var ModuleModalService = function () {};
  
  ModuleModalService.prototype.openWeatherModal = function (location) {
    location = location || null;
    
    return PernaModalService.showModal({
      controller: 'ModuleWeatherEditController',
      templateUrl: 'directive/modules/edit/module-weather-edit.html',
      inputs: {
        location: location
      },
      title: 'Select a Weather Location'
    });
  };

  ModuleModalService.prototype.openTimeModal = function (viewType) {
    viewType = viewType || 'digital';

    return PernaModalService.showModal({
      controller: 'ModuleTimeEditController',
      templateUrl: 'directive/modules/edit/module-time-edit.html',
      inputs: {
        viewType: viewType
      },
      title: 'Choose a view type'
    });
  };

  ModuleModalService.prototype.openCalendarModal = function (calendarIds) {
    calendarIds = calendarIds || [];
    var defer = $q.defer();

    GoogleAuthService.assureIsAuthenticated()
      .then(function () {
        PernaModalService.showModal({
          controller: 'ModuleCalendarEditController',
          templateUrl: 'directive/modules/edit/module-calendar-edit.html',
          inputs: {
            calendarIds: calendarIds
          },
          title: 'Wähle die Kalender, die du anzeigen möchtest.'
        }).then(defer.resolve, defer.reject);
      })
      .catch(defer.reject);

    return defer.promise;
  };
  
  return new ModuleModalService();
  
}]);