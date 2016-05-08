angular.module('perna').service('GoogleOAuthService', ['$http', '$q',
    function ($http, $q) {

        /**
         * Requests a Google OAuth URL from the server.
         * @param accessToken
         * @returns {Promise}
         */
        var getGoogleOAuthURL = function (accessToken) {
            var defer = $q.defer();
            $http({
                url: "http://api.perna.dev/v1/google-auth/auth-url",
                method: "GET",
                headers: {
                    'Access-Token' : accessToken
                }
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
        };

    }]);