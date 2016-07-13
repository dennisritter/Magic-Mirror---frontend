angular.module('perna').service('ModuleModalService', ['PernaModalService', function (PernaModalService) {
  
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

    return PernaModalService.showModal({
      controller: 'ModuleCalendarEditController',
      templateUrl: 'directive/modules/edit/module-calendar-edit.html',
      inputs: {
        calendarIds: calendarIds
      }
    });
  };
  
  return new ModuleModalService();
  
}]);