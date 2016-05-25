angular.module('perna').controller('UsersettingsCtrl', ['$scope', '$window', 'AuthService', 'CookieService', 'GoogleAuthService',
    function ($scope, $window, AuthService, CookieService, GoogleAuthService) {

        /**
         * Redirects the user to it´s specific Google OAuth page delivered by the server.
         */
        $scope.googleAuth = function () {

            // open blank popup and change url to OAuth-url later.
            // necessary to prevent popup from being blocked --> Popup opens directly after userinteraction
            var popupGoogleAuth = $window.open('', '_blank', "googleAuth", "width=500,height=400");
            popupGoogleAuth.document.write('Loading Google Authentication...');

            var successCallback = function () {
                console.log("Connected Google Account");
            };
            var errorCallback = function (response) {
                console.error(response);
            };
            GoogleAuthService.googleAuth(popupGoogleAuth).then(successCallback, errorCallback);
        };
        
    }]);
