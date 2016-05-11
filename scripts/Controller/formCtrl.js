angular.module('perna').controller('formCtrl', ['$scope', '$location', 'StorageService', 'AuthService', 'CookieService', 'ValidationService',
    function ($scope, $location, StorageService, AuthService, CookieService, ValidationService) {

        $scope.btnDisabled = false;

        $scope.login = function () {
            var loginData = {
                email: $scope.user.email,
                password: $scope.user.password
            };
            $scope.btnDisabled = true;
            var successCallback = function (response) {
                $location.path('/dashboard');
                //Saving Tokens in Cookies
                CookieService.setCookies(response);
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

        $scope.save = function (form) {
            var formIsValid = ValidationService.validateForm(form);
            if (!formIsValid){
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
