angular.module('perna').service('PernaModalService', ['ModalService', '$q', function (ModalService, $q) {

  var PernaModalService = function () {};

  PernaModalService.prototype.showModal = function ( options ) {
    var defer = $q.defer();

    var innerTemplateUrl = options.templateUrl;
    options.templateUrl = 'directive/modules/modal-wrapper.html';

    if ( !options.inputs ) {
      options.inputs = {};
    }

    options.inputs.templateUrl = innerTemplateUrl;

    ModalService.showModal( options )
      .then(function (modal) {
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