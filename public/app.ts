// Create main 'app' module with dependencies.
var app = angular.module('app', ['ngRoute', 'toastr']);

// A '.run' block is executed after '.config' and it's the code which needs to run to kickstart the application.
// It is executed after all of the services have been configured and the injector has been created.
// It's possible to inject service instances(but not providers).
app.run(function($rootScope, $location) {
  // Bind handlers to ng-route '$routeChangeError' broadcast event.
  $rootScope.$on("$routeChangeError", function(e, next, prev, err) {
    // If auth service returned "AUTH_REQUIRED" or "NOT_AUTHORIZED"
    // from 'requireLogin' or 'requireAdmin' resolvers.
    if (err === "AUTH_REQUIRED") {
      $location.path("/login");
    }
    if (err === 'NOT_AUTHORIZED') {
      $location.path("/home");
    }
  })
});

app.config(['$locationProvider', function($locationProvider) {
  // Change URL's hashbang #! into #
  $locationProvider.hashPrefix('');
}]);

