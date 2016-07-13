/**
 * @author Dennis
 */

angular.module('perna-filter').filter('transportproducts', function() {
    return function (product) {
        switch(product){
            case ("U"):
                return "U-Bahn";
            case ("B"):
                return "Bus";
            case ("S"):
                return "S-Bahn";
            case ("RE"):
                return "Regionalbahn";
            case ("T"):
                return "Tram";
            case ("F"):
                return "Fähre";
            default:
                return "Unidentified Transport Product";
        }
    };
});