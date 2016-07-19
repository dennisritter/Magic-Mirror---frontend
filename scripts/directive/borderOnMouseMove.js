angular.module('perna').directive('borderOnMouseMove', [function () {
    return {
        restrict: 'A',
        controller: ['$scope', 'MouseService', function ($scope, MouseService) {
            $scope.mouseData = MouseService.mouseData;
        }],
        link: function ($scope, $element) {
            $scope.$watch('mouseData', function () {
                if ($scope.mouseData.isMoving) {
                    $element.addClass('bordered');
                } else {
                    $element.removeClass('bordered');
                }
            }, true);
        }
    };
}]);