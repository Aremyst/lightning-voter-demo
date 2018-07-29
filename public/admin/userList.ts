angular.module('app').component('userList', {
  templateUrl: '/admin/userList.html',
  bindings: {
    users: '=allUsers'
  },
  controller: function() {
    this.$onInit = function() {
      // It's ok to sort "users" from two-way binding, since it's a response data.
      this.users.sort(function(user1, user2) {
        if (user1.firstName < user2.firstName) return -1;
        if (user1.firstName === user2.firstName) return 0;
        if (user1.firstName > user2.firstName) return 1;
      });
    }
  }
});
