// '.config' block is executed before '.run'.
// It allows to inject only providers(to configure services) and constants.
// It's not possible to inject anything else(including services instances).
app.config(function($routeProvider) {
  // Resolvers, which return promises.
  var routeResolvers = {
    // 'auth' is a service, which is injected.
    loggedIn: function(auth) {
      return auth.requireLogin();
    },
    waitForAuth: function(auth) {
      return auth.waitForAuth();
    },
    requireAdmin: function(auth) {
      return auth.requireAdmin();
    },
    userSessions: function(sessions, currentIdentity, auth) {
      return auth.requireLogin().then(function() {
        return sessions.getSessionsByUser(currentIdentity.currentUser.id);
      });
    },
    allSessions: function(sessions, auth) {
      return auth.requireLogin().then(function() {
        return sessions.getAllSessions();
      });
    },
    allUsers: function(users, auth) {
      return auth.requireLogin().then(function() {
        return users.getAllUsers();
      });
    }
  };

  // Config ng-routes via $routeProvider.
  $routeProvider
    .when('/admin/login', {
      controller: 'adminLoginCtrl',
      templateUrl: 'admin/adminLogin.html',
      resolve: {
        // User resolve from above.
        currentAuth: routeResolvers.waitForAuth
      }
    })
    .when('/admin/results', {
      controller: 'resultsCtrl',
      templateUrl: 'admin/results.html',
      controllerAs: 'vm',
      resolve: {
        admin: routeResolvers.requireAdmin,
        allSessions: routeResolvers.allSessions
      }
    })
    .when('/admin/users/:id', {
      controller: 'userDetailsCtrl',
      templateUrl: 'admin/userDetails.html',
      controllerAs: 'vm',
      resolve: {
        admin: routeResolvers.requireAdmin,
        allUsers: routeResolvers.allUsers
      }
    })
    .when('/users', {
      controller: 'userListCtrl',
      templateUrl: 'admin/userlist.html',
      controllerAs: 'vm',
      resolve: {
        admin: routeResolvers.requireAdmin,
        allUsers: routeResolvers.allUsers
      }
    })
    .when('/admin/createusers', {
      controller: 'createUsersCtrl',
      templateUrl: 'admin/createUsers.html',
      controllerAs: 'vm',
      resolve: {
        admin: routeResolvers.requireAdmin
      }
    })
    .when('/home', {
      controller: 'homeCtrl',
      templateUrl: 'home/home.html',
      controllerAs: 'vm',
      resolve: {
        login: routeResolvers.loggedIn,
        userSessions: routeResolvers.userSessions
      }
    })
    .when('/profile', {
      controller: 'profileCtrl',
      templateUrl: 'profile/profile.html',
      controllerAs: 'vm',
      resolve: {
        userProfile: routeResolvers.loggedIn
      }
    })
    .when('/createsession', {
      controller: 'createNewSessionCtrl',
      templateUrl: 'home/createNewSession.html',
      controllerAs: 'vm',
      resolve: {
        userSessions: routeResolvers.userSessions
      }
    })
    .when('/login', {
      controller: 'loginCtrl',
      templateUrl: 'security/login.html',
      controllerAs: 'vm',
      resolve: {
        currentAuth: routeResolvers.waitForAuth
      }
    })
    .when('/logout', {
      controller: 'logoutCtrl',
      controllerAs: 'vm',
      template: '<logout></logout>'
    })
    .otherwise('/home')
});