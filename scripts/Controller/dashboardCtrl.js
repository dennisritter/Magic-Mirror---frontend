angular.module('perna').controller('dashboardCtrl', ['$scope', '$location', 'AuthService','MouseService',
    function ($scope, $location, AuthService, MouseService) {

        $scope.mouseIsMoving = function(){
            MouseService.mouseIsMoving();
        };

        $scope.logout = function () {
            var successCallback = function () {
                $location.path('/start');
            };
            var errorCallback = function (response) {
                console.error("Response ", response);
            };

            AuthService.logout().then(successCallback, errorCallback);
        };

    }]);
