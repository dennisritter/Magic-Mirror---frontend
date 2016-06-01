/**
 * @author Dennis Ritter
 * @name moduleCalendar
 * @desc The directive to use when including a calendar module the dashboard.
 * Manages and describes the functioning and structure of a calendar module.
 */
angular.module('perna').directive('liveviewModule', ['routes',
    function (routes) {
        return {
            restrict: 'AE',
            templateUrl: routes.module,
            controller: ['$scope', 'LiveviewService',
                function ($scope, LiveviewService) {


                    $scope.module = {
                        size: {
                            w: 1,
                            h: 1
                        },
                        position: {
                            x: 0,
                            y: 0,
                        },
                        type: undefined
                    };

                    $scope.index = undefined;

                    var updateModule = function(newModule){
                        $scope.module = newModule;
                    };

                    $scope.setIndex = function(index){
                        $scope.index = index;
                        updateModule(LiveviewService.liveview.modules[index]);
                    };

                    $scope.$watch(
                        function(){
                            if($scope.index !== undefined){
                                return LiveviewService.liveview.modules[$scope.index];
                            }
                        }, function(){
                            updateModule(LiveviewService.liveview.modules[$scope.index]);
                            $scope.resize($scope.module.size.w, $scope.module.size.h);
                            console.log("I updated my Module-Data, this is me: ",  $scope.module );
                            console.log("My Index is: ",  $scope.index );
                            console.log("============================================================");
                            console.log("This is the current liveview: ", LiveviewService.liveview.modules);
                        }
                    );

                    $scope.resize = function(w, h){
                        $scope.module.size.w = w;
                        $scope.module.size.h = h;
                    };

                    /*
                     * jQuery Methode, aus der Bibliothek kopiert, sie stellt die Resize-Funktion
                     * für jedes Item zur Verfügung.
                     * */
                    $('#grid li .resize').click(function (e) {
                        e.preventDefault();
                        var itemElement = $(e.currentTarget).closest('li'),
                            itemWidth = $(e.currentTarget).data('w'),
                            itemHeight = $(e.currentTarget).data('h');

                        $('#grid').gridList('resizeItem', itemElement, {
                            w: itemWidth,
                            h: itemHeight
                        });
                    });
                }],
            link: function (scope, element, attributes) {
                element.attr('data-w', scope.module.size.w);
                element.attr('data-h', scope.module.size.h);
                element.attr('data-x', scope.module.position.x);
                element.attr('data-y', scope.module.position.y);
            }
        };
    }])
;
