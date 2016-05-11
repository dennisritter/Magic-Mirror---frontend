angular.module('perna').run(['$location', 'CookieService', 'AuthService',
function ($location, CookieService, AuthService) {

    var credentials = CookieService.getCookies()

    if (credentials.accessToken !== undefined) {
        AuthService.credentials = credentials;
        $location.path('/dashboard');
    }else if (credentials.refreshToken !== undefined) {
        AuthService.credentials.refreshToken = credentials.refreshToken;
        console.log("pups refresh..");
        AuthService.autoLogin({
            accessToken: AuthService.credentials.refreshToken.accessToken,
            refreshToken: AuthService.credentials.refreshToken.refreshToken
        });
    }
    console.log("Credentials: ", credentials);
    console.log("AuthService.Credentials ", AuthService.credentials);

}]);
