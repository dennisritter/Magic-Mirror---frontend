angular.module('perna').service('GoogleOAuthService', ['$http', '$q', 'CookieService',
    function ($http, $q, CookieService) {
        var getGoogleOAuthURL = function () {
            var accessToken = CookieService.getCookies().accessToken;
            $http({
                http: "http://api.perna.dev/v1/google-auth/auth-url",
                method: "GET",
                data: accessToken
            })
                .success(function(response){
                    defer.resolve(response);
                })
                .error(function(response){
                    defer.reject(response);
                });
            return defer.promise;

        };

        return {
            getGoogleOAuthURL: getGoogleOAuthURL
        }

    }]);