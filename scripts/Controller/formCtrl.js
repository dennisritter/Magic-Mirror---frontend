angular.module('perna').controller('formCtrl', ['$scope', '$location', 'StorageService', 'AuthService',
    function ($scope, $location, StorageService, AuthService) {

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
                console.log("response: " , response);
                $scope.btnDisabled = false;
            };
            var errorCallback = function (response) {
                console.log("Login failed");
                console.log("response: " , response);
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
                console.log("response: " , response);
                $scope.login();
                $scope.btnDisabled = false;
            };
            var errorCallback = function (response) {
                console.log("Failed to register User");
                console.log("response: " , response);
                $scope.submitError = true;
                $scope.errorMessage = response.message;
                $scope.btnDisabled = false;
            };

            StorageService.register(userdata).then(successCallback, errorCallback);
        };
    }]);
