angular.module('perna').service('GoogleAuthService', ['$http', '$q', '$window', 'AuthService', 'api',
    function ($http, $q, $window, AuthService, api) {

        /**
         * Requests a GoogleAuth URL and a stateToken from the Server.
         * On success: Creates an eventlistener which listens for a message that represents the finished Google Authentification.
         * @param accessToken
         * @returns {Promise}
         */
        var googleAuth = function () {
            var defer = $q.defer();
            $http({
                url: api.gauth,
                method: "GET",
                headers: {
                    'Access-Token': AuthService.credentials.accessToken
                }
            })
                .success(function (response) {
                    //response.data.url : the GoogleOAuth URL received from the server
                    var popupGoogleAuth = $window.open(response.data.url, "googleAuth", "width=500,height=400");
                    //response.data.state : a unique Session ID to identify the users AuthSession
                    var state = response.data.state;
                    $window.addEventListener("message", function (event) {
                        if(event.data.event !== "pernaGoogleAuth" || event.origin !== api.source){
                            console.error("Received a wrong message:");
                            console.error(event);
                            return;
                        }
                        if (!event.data.success || state !== event.data.state) {
                            defer.reject(event.data);
                        }
                        popupGoogleAuth.close();
                        $window.removeEventListener("pernaGoogleAuth", function(){});
                        defer.resolve();
                    }, false);
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
