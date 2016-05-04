angular.module('perna').controller('formCtrl', ['$scope', '$location', 'StorageService', 'AuthService', 'CookieService',
    function ($scope, $location, StorageService, AuthService, CookieService) {

        $scope.btnDisabled = false;

        $scope.login = function () {
            var loginData = {
                email: $scope.user.email,
                password: $scope.user.password
            };
            $scope.btnDisabled = true;
            var successCallback = function (response) {
                $location.path('/dashboard');
                console.log(loginData.email + " is now logged in.");
                //Saving Tokens in Cookies
                CookieService.setCookies(response);
                $scope.btnDisabled = false;
            };
            var errorCallback = function (response) {
                console.log("Login failed");
                console.log("Response ", response);
                //Errormessage under SubmitButton
                $scope.submitError = true;
                $scope.errorMessage = response.message;
                $scope.btnDisabled = false;
            };

            AuthService.login(loginData).then(successCallback, errorCallback);
        };


        $scope.save = function () {
            var form = $scope.registrationForm;
            if (!form.$valid) {
                console.log("The form is not valid");
                return;
            }
            var userdata = {
                firstName: $scope.user.firstName,
                lastName: $scope.user.lastName,
                email: $scope.user.email,
                password: $scope.user.password
            };
            $scope.btnDisabled = true;
            var successCallback = function (response) {
                console.log("Registered User");
                $scope.login();
                $scope.btnDisabled = false;
            };
            var errorCallback = function (response) {
                console.log("Failed to register User");
                console.log("Response ", response);
                //Errormessage under SubmitButton
                $scope.submitError = true;
                $scope.errorMessage = response.message;
                $scope.btnDisabled = false;
            };

            StorageService.register(userdata).then(successCallback, errorCallback);
        };
    }]);
