angular.module('perna').controller('formCtrl', ['$scope', '$location', 'StorageService', 'AuthService', 'CookieService',
    function ($scope, $location, StorageService, AuthService, CookieService) {

        $scope.btnDisabled = false;

        $scope.login = function () {
            var loginData = {
                email: $scope.user.email,
                password: $scope.user.password
            };
            $scope.btnDisabled = true;
            var successCallback = function () {
                $location.path('/dashboard');
                $scope.btnDisabled = false;
            };
            var errorCallback = function (response) {
                console.error("Response ", response);
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
            //TODO Passwort auch Clientseitig verschlüsseln --> SHA2
            var userdata = {
                firstName: $scope.user.firstName,
                lastName: $scope.user.lastName,
                email: $scope.user.email,
                password: $scope.user.password
            };
            $scope.btnDisabled = true;
            var successCallback = function (response) {
                $scope.login();
                $scope.btnDisabled = false;
            };
            var errorCallback = function (response) {
                console.error("Response ", response);
                //Errormessage under SubmitButton
                $scope.submitError = true;
                $scope.errorMessage = response.message;
                $scope.btnDisabled = false;
            };

            StorageService.register(userdata).then(successCallback, errorCallback);
        };
    }]);
