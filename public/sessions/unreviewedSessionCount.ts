angular.module('app').service('unreviewedSessionCount', class UnreviewedSessionCount {
  sessions: any;
  currentIdentity: any;
  value: number = 0;

  constructor(sessions, currentIdentity) {
    this.sessions = sessions;
    this.currentIdentity = currentIdentity;
  }

  updateUnreviewedSessionCount() {
    this.sessions.getUnreviewedCount(this.currentIdentity.currentUser.id)
      .then(response => {
        this.value = response.data.count;
      })
  }
});