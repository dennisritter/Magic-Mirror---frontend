angular.module('perna').directive('formControlMessages', function () {

  return {
  	// This Directive is usable as Single Element only. Not as an Attribute or something else..
    restrict: 'E',
    // The HTML that´s loaded by this Directive
    templateUrl: 'directive/form-control-messages.html',
    // The generated Attribute in the scope has the same as the input-fields name
    scope: {
      input: '='
    },
    // The whole is loaded only if there´s some input in it
    transclude: true
  }

});