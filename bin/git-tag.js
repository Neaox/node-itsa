
require('shelljs/global');

var version = require('../package.json').version;
if (exec('git tag '+version).code !== 0) {
  echo('Error: Git tag failed');
  exit(1);
}