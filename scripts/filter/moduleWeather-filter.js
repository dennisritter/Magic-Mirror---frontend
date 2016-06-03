/**
 * @author nathalie
 */

angular.module('perna-filter').filter('celsius', function() {
    return function (input) {
        var celsius = input - 273.15;
        return celsius + " °C";
    };
});