
describe('userDetails', function() {
  var $ctrlCnst;

  beforeEach(module('app'));

  beforeEach(inject(function($componentController) {
    $ctrlCnst = $componentController;
  }));

  it('should set the user on the controller to the matching user by id', function() {

    var ctrl = $ctrlCnst('userDetails',
      // Passed into Component's "controller"
      {
        '$routeParams': {id: 3}
      },
      // Passed into Component's "bindings" object
      {
        allUsers: [
          {id:1,name:'wrong'},
          {id:3,name:'correct'}
        ]
      });

    ctrl.$onInit();

    expect(ctrl.user.name).toBe('correct');
  })
});