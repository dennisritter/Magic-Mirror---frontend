/**
 * @author Dennis Ritter
 * @name modulePublicTransport
 * @desc The directive to use when including a public transport module into the dashboard.
 * Manages and describes the functioning and structure of a public transport module.
 */

angular.module('perna').directive('modulePublicTransportNew', ['routes', 'PublicTransportService',
    function( routes, PublicTransportService  ) {
        return {
            restrict: 'E',
            templateUrl: routes.publicTransport,
            scope: {
                'module': '='
            },
            controller: ['$scope', 'PublicTransportLocationService', 'LiveviewService',
                function( $scope, PublicTransportLocationService, LiveviewService ) {

                }
            ],
            link: function(scope){

            }
        };
    }]);

angular.module('perna').controller('ModulePublicTransportEditController', ['PublicTransportLocationService', '$scope', 'close', 'station', 'products',
    function (LocationService, $scope, close, station, products) {
        $scope.query = '';
        $scope.station = station;
        $scope.products = products;
        $scope.results = [];
    }]);
