angular.module('perna').service('GoogleAuthService', ['$http', '$q',
    function ($http, $q) {

        /**
         * Requests a GoogleAuth URL and a stateToken from the Server.
         * On success: Creates an eventlistener which listens for a message that represents the finished Google Authentification.
         * @param accessToken
         * @returns {Promise}
         */
        var googleAuth = function (accessToken) {
            var defer = $q.defer();
            $http({
                url: "http://api.perna.dev/v1/google-auth/auth-url",
                method: "GET",
                headers: {
                    'Access-Token': accessToken
                }
            })
                .success(function (response) {
                    //response.data.url : the GoogleOAuth URL received from the server
                    var popupGoogleAuth = $window.open(response.data.url, "googleAuth", "width=500,height=400");
                    //response.data.state : a unique Session ID to identify the users AuthSession
                    var state = response.data.state;
                    $window.addEventListener("pernaGoogleAuth", function (event) {
                        if (event.origin !== "http://api.perna.dev" || !event.data.success || state !== event.data.state) {
                            defer.reject(event.data);
                        }
                        popupGoogleAuth.close();
                        defer.resolve();
                        //$window.removeEventListener("pernaGoogleAuth");
                    }, false);
                    //Eventlistener am Ende wieder abmelden
                })
                .error(function (response) {
                    defer.reject(response);
                });
            return defer.promise;
        };

        return {
            googleAuth: googleAuth
        };

    }]);