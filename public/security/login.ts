angular.module('app').component('login', {
  templateUrl: './login.html',
  bindings: {
  },
  controller: class LoginCtrl {
    $location: any;
    auth: any;
    toastr: any;
    email: string;

    constructor($location, currentIdentity, auth, toastr) {
        this.$location = $location;
        this.auth = auth;
        this.toastr = toastr;

        if (currentIdentity.authenticated()) {
            this.$location.path('/home');
        }
    }

    login() {
        this.auth.login({
            // this.email is set from the View.
            username: this.email,
            password: "pass"
        }).then(() => {this.$location.path('/home');},
            (err) => { this.toastr.error(err); });
    }
  }
});