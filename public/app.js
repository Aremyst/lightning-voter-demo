// Create main 'app' module with dependencies.
var app = angular.module('app', ['ngRoute', 'toastr']);

app.run(function($rootScope, $location) {
  // Bind handlers to ng-route '$routeChangeError' broadcast event.
  $rootScope.$on("$routeChangeError", function(e, next, prev, err) {
    // If auth service returned "AUTH_REQUIRED" or "NOT_AUTHORIZED"
    // from 'requireLogin' or 'requireAdmin' resolvers.
    if(err === "AUTH_REQUIRED") {
      $location.path("/login");
    }
    if(err === 'NOT_AUTHORIZED') {
      $location.path("/home");
    }
  })
});
