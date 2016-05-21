angular.module('perna').directive('showOnMouseMove', function () {
    return {
        restrict: 'A',
        controller: ['$scope', 'MouseService', function ($scope, MouseService) {
            $scope.mouseData = MouseService.mouseData;
        }],
        link: function ($scope, $element) {
            $scope.$watch('mouseData', function () {
                if ($scope.mouseData.isMoving) {
                    $element.removeClass('hidden');
                } else {
                    $element.addClass('hidden');
                }
            }, true);
        }
    };
});