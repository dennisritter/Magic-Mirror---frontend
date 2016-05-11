angular.module('perna').controller('dashboardCtrl', ['$scope', '$location', 'AuthService', 'CookieService','MouseService',
    function ($scope, $location, AuthService, CookieService, MouseService) {

        $scope.mouseIsMoving = function(){
            MouseService.mouseIsMoving();
        };

        $scope.logout = function () {
            var successCallback = function (response) {
                CookieService.deleteCookies();
                $location.path('/start');
            };
            var errorCallback = function (response) {
                console.error("Response ", response);
            };

            AuthService.logout().then(successCallback, errorCallback);
        };

    }]);
