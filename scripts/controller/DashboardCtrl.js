angular.module('perna').controller('DashboardCtrl', ['$scope', '$state', 'AuthService', 'MouseService', 'CalendarService',
    function ($scope, $state, AuthService, MouseService) {
        
        $scope.mouseIsMoving = function () {
            MouseService.mouseIsMoving();
        };

        $scope.logout = function () {
            console.log("logout() in DashboardCtrl called..");
            var successCallback = function () {
                $state.go('start');
            };
            var errorCallback = function (response) {
                console.error("Response ", response);
            };

            AuthService.logout().then(successCallback, errorCallback);
        };

    }]);
