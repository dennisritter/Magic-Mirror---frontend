angular.module('perna').service('PernaModalService', ['ModalService', '$q', function (ModalService, $q) {

  var PernaModalService = function () {};

  PernaModalService.prototype.showModal = function ( options ) {
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
    var defer = $q.defer();

    var innerTemplateUrl = options.templateUrl;
    options.templateUrl = 'directive/modules/modal-wrapper.html';

    if ( !options.inputs ) {
      options.inputs = {};
    }

    ModalService.showModal( options )
      .then(function (modal) {
        modal.scope.templateUrl = innerTemplateUrl;
        if ( options.title ) {
          modal.scope.title = options.title;
        }

        var element = jQuery(modal.element);
        element.modal();

        modal.close
          .then(function ( data ) {
            element.modal('hide');

            if ( data === -1 ) {
              defer.reject();
            } else {
              defer.resolve(data);
            }
          });
      });

    return defer.promise;

  };

  return new PernaModalService();

}]);