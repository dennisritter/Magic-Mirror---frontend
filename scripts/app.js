angular.module('perna', [
    'ngMessages',
    'ui.router',
    'ngPassword',
    'ngCookies',
]).constant('routes', {
    home : 'layout/start.html',
    dashboard : 'layout/dashboard.html',
    usersettings : 'layout/usersettings.html',
    formcontrol : 'directive/form-control-messages.html',
    calendar : 'directive/modules/module-calendar.html'
}).constant('api', {
    source : 'http://api.perna.dev',
    login : 'http://api.perna.dev/v1/login',
    save : 'http://api.perna.dev/v1/register',
    refresh : 'http://api.perna.dev/v1/refresh',
    logout : 'http://api.perna.dev/v1/logout',
    gauth : 'http://api.perna.dev/v1/google-auth/auth-url',
    calendars: 'http://api.perna.dev/v1/calendar/calendars',
    events: 'http://api.perna.dev/v1/calendar/events'
});
