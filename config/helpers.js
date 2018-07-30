var path = require('path');
var _root = path.resolve(__dirname, '..');

// Little utility, which let's us go up one level in current directory.
function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [_root].concat(args));
}
exports.root = root;