angular.module('perna').controller('usersettingsCtrl', ['$scope','AuthService', 'CookieService', 'GoogleAuthService', 'calendarService',
    function ($scope, AuthService, CookieService, GoogleAuthService, calendarService) {

        /**
         * Redirects the user to it´s specific Google OAuth page delivered by the server.
         */
        $scope.googleAuth = function () {

            var successCallback = function () {
                console.log("success");
            };
            var errorCallback = function (response) {
                console.error(response);
            };
            GoogleAuthService.googleAuth().then(successCallback, errorCallback);
        };

        $scope.getCalendars = function(){
            var successCallback = function(response){
                console.log("loaded calendars into --> calendarService.calendars");
            };
            var errorCallback = function(response){
                console.error(response);
            };
            calendarService.getCalendars(AuthService.credentials.accessToken).then(successCallback, errorCallback);
        };
    }]);
