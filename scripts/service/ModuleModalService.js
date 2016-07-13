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

  ModuleModalService.prototype.openPublicTransportModal = function (station, products) {

    return PernaModalService.showModal({
      controller: 'ModulePublicTransportEditController',
      templateUrl: 'directive/modules/edit/module-publictransport-edit.html',
      inputs: {
        station: station,
        products: products
      },
      title: 'Select a departure location and products'
    });
  };
  
  return new ModuleModalService();
  
}]);