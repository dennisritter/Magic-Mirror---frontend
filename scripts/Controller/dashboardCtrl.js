angular.module('perna').controller('dashboardCtrl', ['$scope', '$state', 'AuthService','MouseService',
    function ($scope, $state, AuthService, MouseService) {

        $scope.mouseIsMoving = function(){
            MouseService.mouseIsMoving();
        };

        $scope.logout = function () {
            var successCallback = function () {
                $state.go('start');
            };
            var errorCallback = function (response) {
                console.error("Response ", response);
            };

            AuthService.logout().then(successCallback, errorCallback);
        };

    }]);
