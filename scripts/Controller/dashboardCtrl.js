angular.module('perna').controller('dashboardCtrl', ['$scope', '$location', 'AuthService', 'CookieService',
    function ($scope, $location, AuthService, CookieService) {

        $scope.logout = function () {
            var accessToken = CookieService.getCookies().accessToken;
            console.log(accessToken);
            var successCallback = function (response) {
                CookieService.deleteCookies();
                $location.path('/start');
            };
            var errorCallback = function (response) {
                console.log("Response ", response);
            };

            AuthService.logout(accessToken).then(successCallback, errorCallback);
        };

    }]);
