angular.module('perna').controller('usersettingsCtrl', ['$scope', '$location', '$window', 'CookieService', 'GoogleOAuthService',
    function ($scope, $location, $window, CookieService, GoogleOAuthService) {

        /**
         * Redirects the user to it´s specific Google OAuth page delivered by the server.
         */
        $scope.googleOAuth = function () {

            var successCallback = function () {
                
            };
            var errorCallback = function (response) {
                console.error(response);
            };
            var accessToken = CookieService.getCookies().accessToken;
            GoogleOAuthService.getGoogleOAuthURL(accessToken).then(successCallback, errorCallback);
        };
    }]);
