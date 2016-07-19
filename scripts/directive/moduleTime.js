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
            controller: ['$scope', 'AuthService', 'CalendarService', 'LiveviewService', 'ModuleModalService',
                function ($scope, AuthService, CalendarService, LiveviewService, ModuleModalService) {

                    /**
                     * @name configMode
                     * @desc Switch for the view to show either the Events or Settings for this calendar module.
                     * If true: show settings view.
                     * If false: show events view.
                     * @type {boolean}
                     */
                    $scope.configMode = false;
                    $scope.countdown = false;
                    $scope.viewType = $scope.module.viewType || 'digital';
                    $scope.time = Date.now();

                    var updateTime = function () {
                        $scope.time = Date.now();
                        $timeout(function () {
                            updateTime();
                        }, 1000);
                    };
                    $timeout(function () {
                        updateTime();
                    }, 1000);

                    var updateCountdown = function () {
                        $scope.counter -= 10;
                        if ($scope.counter < 30000) {
                            $('.countdownDisplay').addClass('lastSeconds');
                        }
                        if ($scope.count === 0) {
                            stopCountdown();
                        }
                        if ($scope.countdown) {
                            $timeout(function () {
                                updateCountdown();
                            }, 10);
                        }
                    };

                    $scope.startCountdown = function () {
                        $scope.counter = 180 * 1000;
                        $scope.countdown = true;
                        updateCountdown();
                    };

                    $scope.stopCountdown = function () {
                        $scope.countdown = false;
                    };

                    $scope.edit = function () {
                        ModuleModalService.openTimeModal($scope.viewType)
                            .then(function (viewType) {
                                $scope.viewType = viewType;
                                $scope.module.viewType = viewType;
                                LiveviewService.persist();
                            });
                    };

                    $scope.delete = function () {
                        LiveviewService.deleteModule($scope.module);
                    };

                    /**
                     * The following functions draw a analog clock using the HTML5 canvas
                     **/

                    var drawClock = function () {
                        if ($scope.viewType == 'analog') {
                            var canvas = document.getElementById("clockCanvas");
                            canvas.width = 450;
                            canvas.height = 450;
                            var ctx = canvas.getContext("2d");
                            var radius = (canvas.height / 2);
                            ctx.translate(radius, radius);
                            radius = radius * 0.9;
                            drawFace(ctx, radius);
                            drawNumbers(ctx, radius);
                            drawTime(ctx, radius);
                        } else {
                            return;
                        }
                    };

                    var drawFace = function (ctx, radius) {
                        ctx.beginPath();
                        ctx.arc(0, 0, radius, 0, 2 * Math.PI);
                        ctx.lineWidth = 5;
                        ctx.strokeStyle = 'white';
                        ctx.stroke();
                        ctx.beginPath();
                        ctx.arc(0, 0, radius * 0.1, 0, 2 * Math.PI);
                        ctx.fillStyle = '#fff';
                        ctx.fill();
                    };

                    var drawNumbers = function (ctx, radius) {
                        var ang;
                        var num;
                        ctx.font = radius * 0.15 + "px arial";
                        ctx.textBaseline = "middle";
                        ctx.textAlign = "center";
                        for (num = 1; num < 13; num++) {
                            ang = num * Math.PI / 6;
                            ctx.rotate(ang);
                            ctx.translate(0, -radius * 0.85);
                            ctx.rotate(-ang);
                            ctx.fillText(num.toString(), 0, 0);
                            ctx.rotate(ang);
                            ctx.translate(0, radius * 0.85);
                            ctx.rotate(-ang);
                        }
                    };

                    var drawTime = function (ctx, radius) {
                        var now = new Date();
                        var hour = now.getHours();
                        var minute = now.getMinutes();
                        var second = now.getSeconds();
                        hour = hour % 12;
                        hour = (hour * Math.PI / 6) +
                            (minute * Math.PI / (6 * 60)) +
                            (second * Math.PI / (360 * 60));
                        drawHand(ctx, hour, radius * 0.5, radius * 0.07);
                        minute = (minute * Math.PI / 30) + (second * Math.PI / (30 * 60));
                        drawHand(ctx, minute, radius * 0.8, radius * 0.07);
                        second = (second * Math.PI / 30);
                        drawHand(ctx, second, radius * 0.9, radius * 0.02);
                    };

                    var drawHand = function (ctx, pos, length, width) {
                        ctx.beginPath();
                        ctx.lineWidth = width;
                        ctx.lineCap = "round";
                        ctx.moveTo(0, 0);
                        ctx.rotate(pos);
                        ctx.lineTo(0, -length);
                        ctx.stroke();
                        ctx.rotate(-pos);
                    };

                    var analogInterval = null;
                    $scope.$watch('viewType', function (viewType) {
                        if (viewType.localeCompare('analog') === 0 && !analogInterval) {
                            analogInterval = setInterval(drawClock, 1000);
                        }

                        if (viewType.localeCompare('analog') !== 0 && analogInterval) {
                            clearInterval(analogInterval);
                            analogInterval = null;
                        }
                    });

                    $scope.toggleCountdown = function () {
                        if ($scope.countdown) {
                            $scope.stopCountdown();
                            if($scope.module.viewType.localeCompare('analog')){
                                analogInterval = setInterval(drawClock, 1000);
                            }
                        } else {
                            $scope.startCountdown();
                            clearInterval(analogInterval);
                            analogInterval = null;
                        }
                    };

                    $scope.$on('$destroy', function () {
                        if (analogInterval) {
                            clearInterval(analogInterval);
                            analogInterval = null;
                        }
                    });

                    /** VOICE CALLBACKS */
                    var voiceStopTimer = function () {
                        $scope.toggleCountdown();
                        $scope.$apply();
                    };

                    /**
                     * Voice Commands
                     */
                    var commands = {
                        "Stop": voiceStopTimer,
                        "Stopp": voiceStopTimer
                    };
                    annyang.addCommands(commands);
                }]
        };
    }]);

angular.module('perna').controller('ModuleTimeEditController', ['$scope', 'close', 'viewType', function ($scope, close, viewType) {
    $scope.data = {
        viewType: viewType
    };

    $scope.submit = function () {
        close($scope.data.viewType);
    };

    $scope.cancel = function () {
        close(-1);
    };
}]);
