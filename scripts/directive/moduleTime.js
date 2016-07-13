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
            $scope.analog = false;
            $scope.time = Date.now();

            var updateTime = function(){
                $scope.time = Date.now();
                $timeout(function(){
                    updateTime();
                }, 1000);
            };
            $timeout(function(){
                updateTime();
            }, 1000);

            var updateCountdown = function(){
                $scope.counter -= 10;
                if($scope.counter < 30000){
                    $('.countdownDisplay').addClass('lastSeconds');
                }
                if ($scope.count === 0) {
                    stopCountdown();
                }
                if($scope.countdown){
                    $timeout(function(){
                        updateCountdown();
                    }, 10);
                }
            };
            $scope.startCountdown = function() {
                $scope.counter = 180 * 1000;
                $scope.countdown = true;
                updateCountdown();
            };
            $scope.stopCountdown = function() {
                $scope.countdown = false;
            };
            $scope.toggleCountdown = function(){
                if($scope.countdown){
                    $(".startCountdown").removeClass('hidden');
                    $scope.stopCountdown();
                }else{
                    $(".startCountdown").addClass('hidden');
                    $scope.startCountdown();
                }
            };

            var persist = function(){
                LiveviewService.persist();
            };

            $scope.save = function () {
                $scope.configMode = false;
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

            $scope.switchClockMode = function(){
                $scope.analog = !$scope.analog;
                setInterval(function(){
                    drawClock();
                },1000);
            };

            /**
            * The following functions draw a analog clock using the HTML5 canvas
            **/

            function drawClock () {
                if ($scope.analog){
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
                }else{
                    return;
                }
            }

            function drawFace(ctx, radius) {
                ctx.beginPath();
                ctx.arc(0, 0, radius, 0, 2*Math.PI);
                ctx.lineWidth = 5;
                ctx.strokeStyle = 'white';
                ctx.stroke();
                ctx.beginPath();
                ctx.arc(0, 0, radius*0.1, 0, 2*Math.PI);
                ctx.fillStyle = '#fff';
                ctx.fill();
            }

            function drawNumbers(ctx, radius) {
                var ang;
                var num;
                ctx.font = radius*0.15 + "px arial";
                ctx.textBaseline="middle";
                ctx.textAlign="center";
                for(num = 1; num < 13; num++){
                    ang = num * Math.PI / 6;
                    ctx.rotate(ang);
                    ctx.translate(0, -radius*0.85);
                    ctx.rotate(-ang);
                    ctx.fillText(num.toString(), 0, 0);
                    ctx.rotate(ang);
                    ctx.translate(0, radius*0.85);
                    ctx.rotate(-ang);
                }
            }

            function drawTime(ctx, radius){
                var now = new Date();
                var hour = now.getHours();
                var minute = now.getMinutes();
                var second = now.getSeconds();
                hour=hour%12;
                hour=(hour*Math.PI/6)+
                (minute*Math.PI/(6*60))+
                (second*Math.PI/(360*60));
                drawHand(ctx, hour, radius*0.5, radius*0.07);
                minute=(minute*Math.PI/30)+(second*Math.PI/(30*60));
                drawHand(ctx, minute, radius*0.8, radius*0.07);
                second=(second*Math.PI/30);
                drawHand(ctx, second, radius*0.9, radius*0.02);
            }

            function drawHand(ctx, pos, length, width) {
                ctx.beginPath();
                ctx.lineWidth = width;
                ctx.lineCap = "round";
                ctx.moveTo(0,0);
                ctx.rotate(pos);
                ctx.lineTo(0, -length);
                ctx.stroke();
                ctx.rotate(-pos);
            }

            var voiceStopTimer = function () {
                console.log("Stop");
                $scope.toggleCountdown();
                $scope.$apply();
            };

            /**
             * Voice Commands
             */
            var commands = {
                "Stop": voiceStopTimer,
                "Stopp" : voiceStopTimer
            };
            annyang.addCommands(commands);
        }]
    };
}]);
