angular.module('perna').controller('usersettingsCtrl', ['$scope', '$location', 'CookieService', 'GoogleOAuthService',
    function ($scope, $location, CookieService, GoogleOAuthService) {

        /**
         * Redirects the user to it´s specific Google OAuth page delivered by the server.
         */
        $scope.googleOAuth = function(){

            var successCallback = function(response){
                console.log(response);
                // $location.path(response);
            };
            var errorCallback = function(response){
                console.error(response);
            };
            var accessToken = CookieService.getCookies().accessToken;
            GoogleOAuthService.getGoogleOAuthURL(accessToken).then(successCallback, errorCallback);
        };
    }]);
