angular.module('perna-filter', []);

var baseEndpoint = 'http://perna-api.jannikportz.de';

angular.module('perna', [
    'perna-filter',
    'ngMessages',
    'ui.router',
    'ngPassword',
    'ngCookies',
    'angularModalService'
]).constant('routes', {
    home : 'layout/start.html',
    dashboard : 'layout/dashboard.html',
    usersettings : 'layout/usersettings.html',
    modulesettings: 'layout/components/module-settings.html',
    formcontrol : 'directive/form-control-messages.html',
    calendar : 'directive/modules/module-calendar.html',
    weather : 'directive/modules/module-weather.html',
    time : 'directive/modules/module-time.html',
    publicTransport : 'directive/modules/module-publictransport.html',
    module : 'directive/modules/liveview-module.html'
}).constant('api', {
    source : baseEndpoint,
    login : baseEndpoint + '/v1/login',
    save : baseEndpoint + '/v1/register',
    refresh : baseEndpoint + '/v1/refresh',
    logout : baseEndpoint + '/v1/logout',
    gauth : baseEndpoint + '/v1/google-auth/auth-url',
    calendars: baseEndpoint + '/v1/calendar/calendars',
    events: baseEndpoint + '/v1/calendar/events',
    weather_autocomplete: baseEndpoint + '/v1/weather/locations/autocomplete',
    weather_nearby: baseEndpoint + '/v1/weather/locations/nearby',
    city_data: baseEndpoint + '/v1/weather/locations/',
    weather_getWeather: baseEndpoint + '/v1/weather/',
    city_search: baseEndpoint + '/v1/weather/locations/search',
    stations_search: baseEndpoint + '/v1/publicTransport/stations/search',
    station_specific_search: baseEndpoint + '/v1/publicTransport/stations/',
    departures:  baseEndpoint + '/v1/publicTransport/departures/',
    module: baseEndpoint + '/v1/modules/',
    modules: baseEndpoint + '/v1/modules'
// >>>>>>> ac1bb7b8991492b553433eed9f6137870798fac5
});
