declare var toastr;

// Service wrapper around global 'toastr' variable.
(function() {
  // Create 'toastr' module.
  var toastrModule = angular.module('toastr', []);

  // Config toastr using global 'toastr'.
  toastr.options.timeOut = 1000;

  // Create value(simple service), which returns global 'toastr'.
  toastrModule.value('toastr', toastr);
}());