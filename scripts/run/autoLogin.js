/**
 * @author Dennis Ritter
 * @name AutoLogin
 * @desc Checks if the user has a valid accessToken or refreshToken. If so, the userLogin performs automatically
 */
angular.module('perna').run(['$state', 'CookieService', 'AuthService',
    function ($state, CookieService, AuthService) {

        var credentials = CookieService.getCookies();

        if (credentials.refreshToken !== undefined) {
            AuthService.credentials.refreshToken = credentials.refreshToken;

            var successCallback = function () {
                $state.go('dashboard');
            };

            var errorCallback = function (response) {
                console.error("Response ", response);
            };

            AuthService.autoLogin({
                accessToken: credentials.refreshToken.accessToken,
                refreshToken: credentials.refreshToken.refreshToken
            }).then(successCallback, errorCallback);
        }

    }]);
