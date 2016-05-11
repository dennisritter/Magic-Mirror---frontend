angular.module('perna').controller('usersettingsCtrl', ['$scope', 'CookieService', 'GoogleAuthService',
    function ($scope, CookieService, GoogleAuthService) {

        /**
         * Redirects the user to it´s specific Google OAuth page delivered by the server.
         */
        $scope.googleAuth = function () {

            var successCallback = function () {
                console.log("success");
            };
            var errorCallback = function (response) {
                console.error(response);
            };
            var accessToken = CookieService.getCookies().accessToken;
            GoogleAuthService.googleAuth(accessToken).then(successCallback, errorCallback);
        };
    }]);
