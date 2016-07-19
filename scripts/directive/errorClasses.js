angular.module('perna').directive('errorClasses', [function () {
  return {
    restrict: 'A',
    scope: {
      input: '=errorClasses'
    },
    link: function ( $scope, $element, $attr ) {
      var updateClass = function () {
        if ( $scope.input.$touched && !$scope.input.$valid ) {
          $attr.$addClass( 'has-error' );
        } else {
          $attr.$removeClass( 'has-error' );
        }
      };

      $scope.$watch( 'input.$valid', updateClass, true );
      $scope.$watch( 'input.$touched', updateClass, true );
    }
  };
}]);