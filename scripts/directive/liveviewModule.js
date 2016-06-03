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
            scope: {
                'module': '='
            },
            controller: ['$scope', 'LiveviewService',
                function ($scope, LiveviewService) {
                    
                    // $scope.module = {
                    //     "id": 0,
                    //     "type": 'calendar',
                    //     "width": 1,
                    //     "height": 3,
                    //     "xPosition": 0,
                    //     "yPosition": 0,
                    //     "calendarIds": []
                    // };

                    $scope.resize = function (w, h) {
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
                element.attr('data-w', scope.module.width);
                element.attr('data-h', scope.module.height);
                element.attr('data-x', scope.module.xPosition);
                element.attr('data-y', scope.module.yPosition);
            }
        };
    }])
;
