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
                    //response.data.url : the GoogleOAuth URL received from the server
                    var popupGoogleAuth = $window.open(response.data.url, "GoogleOAuth", "width=500,height=400");
                    //response.data.state : a unique Session ID to identify the users AuthSession
                    var state = response.data.state;
                    $window.addEventListener("pernaGoogleAuth", function(event){
                        if(event.origin !== "http://api.perna.dev"){
                            defer.reject(event.data);
                        }
                        if(!event.data.success){
                            defer.reject(event.data);
                        }
                        if(state !== event.data.state){
                            defer.reject(event.data);
                        }
                        popupGoogleAuth.close();
                        defer.resolve();
                    }, false);
                    //Eventlistener am Ende wieder abmelden
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