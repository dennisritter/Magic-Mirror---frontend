angular.module('perna').run(['$location', 'CookieService', 'AuthService',
    function ($location, CookieService, AuthService) {

        var credentials = CookieService.getCookies()

        if (credentials.accessToken !== undefined) {
            AuthService.credentials = credentials;
            $location.path('/dashboard');
        }
        if (credentials.refreshToken !== undefined) {
            AuthService.credentials.refreshToken = credentials.refreshToken;
            //autologinmethode callen
        }
        console.log("Credentials: ", credentials);
        console.log("AuthService.Credentials ", AuthService.credentials);

    }]);
