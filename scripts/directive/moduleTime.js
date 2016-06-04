/**
 * @author Dennis Ritter
 * @name moduleCalendar
 * @desc The directive to use when including a calendar module the dashboard.
 * Manages and describes the functioning and structure of a calendar module.
 */
angular.module('perna').directive('moduleTime', ['$timeout', 'routes',
    function ($timeout, routes) {
        return {
            restrict: 'E',
            templateUrl: routes.time,
            scope: {
              'module': '='
            },
            controller: ['$scope', 'AuthService', 'CalendarService', 'LiveviewService',
                function ($scope, AuthService, CalendarService, LiveviewService) {

                    /**
                     * @name configMode
                     * @desc Switch for the view to show either the Events or Settings for this calendar module.
                     * If true: show settings view.
                     * If false: show events view.
                     * @type {boolean}
                     */
                    $scope.configMode = false;
                    $scope.countdown = false;
                    $scope.time = Date.now();

                    var updateTime = function(){
                        $scope.time = Date.now();
                        //loop the timer
                        $timeout(function(){
                            updateTime();
                        }, 1000);
                    };
                    //start the timer
                    $timeout(function(){
                        updateTime();
                    }, 1000);

                    var updateCountdown = function(){
                        $scope.counter -= 1;
                        if(!$scope.cdIsPaused && !$scope.cdIsStopped){
                            $timeout(function(){
                                updateCountdown();
                            }, 1);
                        }
                    };
                    $scope.startCountdown = function() {
                        $scope.counter = 180 * 1000;
                        updateCountdown();
                    };



                    var persist = function(){
                        LiveviewService.persist();
                    };

                    $scope.save = function () {
                        $scope.configMode = false;
                        $scope.getEvents();
                        persist();
                    };
                    
                    $scope.edit = function () {
                        $scope.configMode = true;
                    };

                    $scope.delete = function(){
                        var successCallback = function(){
                            console.log("Deleted module: ", $scope.module);
                        };
                        var errorCallback = function(response){
                            console.error("deleteModuleError: ", response);
                        };
                        LiveviewService.deleteModule($scope.module).then(successCallback, errorCallback);
                    };
                }]
        };
    }]);
