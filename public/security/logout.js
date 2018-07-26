angular.module('app').component('logout', {
  // This component does not use any html template
  // templateUrl: ...
  bindings: {
  },
  controller: function($location, auth) {
      auth.logout();

      $location.path('/login');
    }
  });