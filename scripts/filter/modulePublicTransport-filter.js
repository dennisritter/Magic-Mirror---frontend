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

angular.module('perna-filter').filter('departures', function () {
    return function (departures, property) {
        if ( property !== 'realTime' && property !== 'scheduledTime' ) {
            property = 'realTime';
        }

        var out = [];
        var now = new Date();
        for ( var i = 0; i < departures.length; ++i ) {
            var time = new Date(departures[i][property]);
            if ( now <= time ) { // only use actually upcoming departures
                out.push( departures[i] );
            }
        }

        out.sort(function (a, b) {
            var aTime = new Date(a[property]);
            var bTime = new Date(b[property]);

            if ( aTime > bTime ) {
                return 1;
            } else if ( aTime === bTime ) {
                return 0;
            }

            return -1;
        });

        return out;
    };
});

angular.module('perna-filter').filter('minuteDifference', function () {
    return function ( timeString ) {
        var diff = new Date(timeString) - new Date(); // difference in milliseconds
        var minutes = Math.ceil(diff / (1000 * 60)); console.log(minutes);
        return minutes;
    }
});