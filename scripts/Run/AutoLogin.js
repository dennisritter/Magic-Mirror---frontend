/**
 * Checks if the user has a valid accessToken or refreshToken. If so, the userLogin performs automatically
 */
angular.module('perna').run(['$location', 'CookieService', 'AuthService',
    function ($location, CookieService, AuthService) {

        var credentials = CookieService.getCookies()

        if (credentials.accessToken !== undefined) {
            AuthService.credentials = credentials;
            $location.path('/dashboard');
        } else if (credentials.refreshToken !== undefined) {
            AuthService.credentials.refreshToken = credentials.refreshToken;

            var successCallback = function () {
                $location.path('/dashboard');
            }

            var errorCallback = function (response) {
                console.error("Response ", response);
            }

            AuthService.autoLogin({
                accessToken: credentials.refreshToken.accessToken,
                refreshToken: credentials.refreshToken.refreshToken
            }).then(successCallback, errorCallback);
        }
        
    }]);
