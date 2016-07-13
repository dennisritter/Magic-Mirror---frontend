angular.module('perna').service('GoogleAuthService', ['$http', '$q','$window', 'AuthService', 'api', 'CalendarService',
    function ($http, $q, $window, AuthService, api, CalendarService) {

        /**
         * Requests a GoogleAuth URL and a stateToken from the Server.
         * On success: Creates an eventlistener which listens for a message that represents the finished Google Authentification.
         * @param popupWindow
         * @returns {Promise}
         */
        var googleAuth = function (popupWindow) {
            var defer = $q.defer();
            $http({
                url: api.gauth,
                method: "GET"
            })
                .success(function (response) {
                    //response.data.url : the GoogleOAuth URL received from the server
                    popupWindow.location.href = response.data.url;

                    //response.data.state : a unique Session ID to identify the users AuthSession
                    var state = response.data.state;
                    $window.addEventListener("message", function (event) {
                        if(event.data.event !== "pernaGoogleAuth" || event.origin !== api.source){
                            return;
                        }
                        if (!event.data.success || state !== event.data.state) {
                            defer.reject(event.data);
                        }
                        popupWindow.close();
                        $window.removeEventListener(this, function(){});
                        defer.resolve();
                    }, false);
                })
                .error(function (response) {
                    defer.reject(response);
                });
            return defer.promise;
        };

        var assureIsAuthenticated = function () {
            var defer = $q.defer();
            CalendarService.getAvailableCalendars()
              .then(defer.resolve)
              .catch(function () {
                  var popupGoogleAuth = window.open('', '_blank', "googleAuth", "width=500,height=400");
                  popupGoogleAuth.document.write('Bitte warten...');
                  googleAuth(popupGoogleAuth)
                    .then(function () {
                        CalendarService.getAvailableCalendars()
                          .then(defer.resolve)
                          .catch(defer.reject);
                    })
                    .catch(defer.reject);
              });
            return defer.promise;
        };

        return {
            googleAuth: googleAuth,
            assureIsAuthenticated: assureIsAuthenticated
        };
    }]);
