angular.module('perna').controller('usersettingsCtrl', ['$scope','AuthService', 'CookieService', 'GoogleAuthService', 'CalendarService',
    function ($scope, AuthService, CookieService, GoogleAuthService, CalendarService) {

        /**
         * Redirects the user to it´s specific Google OAuth page delivered by the server.
         */
        $scope.googleAuth = function () {

            var successCallback = function () {
                console.log("Connected Google Account");
            };
            var errorCallback = function (response) {
                console.error(response);
            };
            GoogleAuthService.googleAuth().then(successCallback, errorCallback);
        };
        
    }]);
