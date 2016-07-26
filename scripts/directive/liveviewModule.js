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
            controller: ['$scope',
                function ($scope) {
                    //@note: You can find the predefined modules in the LivevieCtrl.

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
                    
                    $scope.resize = function (w, h) {
                        $scope.module.width = w;
                        $scope.module.height = h;
                    };
                }],
            link: function (scope, element) {
                element.attr('data-w', scope.module.width);
                element.attr('data-h', scope.module.height);
                element.attr('data-x', scope.module.xPosition);
                element.attr('data-y', scope.module.yPosition);
                element.attr('data-module-id', scope.module.id);

                /**
                 * @desc Watches the position attributes of the module.
                 * Whenever one of them changes, the module-Object updates it´s position values xPosition $ yPosition
                 */
                scope.$watch(function () {
                        return [element.attr('data-x'), element.attr('data-y')];
                    },
                    function (value) {
                        scope.module.xPosition = value[0];
                        scope.module.yPosition = value[1];
                    }, true);
            }
        };
    }])
;
