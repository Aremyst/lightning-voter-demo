angular.module('app').directive('unreviewedTalk', function() {
  return {
    templateUrl: '/home/unreviewedTalk.html',
    // Same as below.
    scope: {
      session: '=',
      voteYes: '&',
      voteNo: '&'
    },
    bindToController: true,
    // DN: Same as above.
    // scope: {},
    // bindToController: {
    //   session: '=',
    //   voteYes: '&',
    //   voteNo: '&'
    // },
    controllerAs: '$ctrl',
    controller: function() {

      this.yes = function() {
        this.voteYes();
      };

      this.no = function() {
        this.voteNo();
      }
    }
  }
});
