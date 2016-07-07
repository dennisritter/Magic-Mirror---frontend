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
  
  return new ModuleModalService();
  
}]);