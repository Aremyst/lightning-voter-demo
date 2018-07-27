angular.module('app')
  .component('home', {
    templateUrl: '/home/home.html',
    bindings: {
      userSessions: '='
    },
    controller: function(currentIdentity, sessions, toastr, unreviewedSessionCount) {
      this.currentUser = currentIdentity.currentUser;

      this.setNextSessionToReview = function() {
        sessions.getNextUnreviewedSession(currentIdentity.currentUser.id)
          .then((response) => {
            // 'this' is the same 'this' as above in arrow function.
            this.currentSessionToReview = response.data;
          });
      };
      this.setNextSessionToReview();

      this.voteYes = function() {
        sessions.incrementVote(this.currentSessionToReview.id)
          .then(() => sessions.addReviewedSession(this.currentUser.id, this.currentSessionToReview.id))
          .then(() => {
            this.setNextSessionToReview();

            // pull updated value
            unreviewedSessionCount.updateUnreviewedSessionCount();
          });
      };

      this.voteNo = function() {
        sessions.addReviewedSession(this.currentUser.id, this.currentSessionToReview.id)
          .then(function() {
            this.setNextSessionToReview();

            // pull updated value
            unreviewedSessionCount.updateUnreviewedSessionCount();
          }.bind(this));
      };
    }
  });