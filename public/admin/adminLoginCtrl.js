angular.module('app').controller('adminLoginCtrl',
  function($location, currentIdentity, auth, toastr) {
    // this.email and this.password vars will be created from the View.

    this.loggedIn = currentIdentity.authenticated();
    // Redirect User to /home if he's logged in already.
    if (this.loggedIn) {
      $location.path('/home');
    }

    this.login = function() {
      auth.login({
        username: this.email,
        password: this.password
      }).then(function() {
        $location.path('/home');
      }, function(err) {
        toastr.error(err);
      })
    }
  });
