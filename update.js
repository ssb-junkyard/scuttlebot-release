
var _pkg = require('scuttlebot/package.json')
var pkg = require('./package.json')

var version = process.argv[2]

pkg.devDependencies = _pkg.devDependencies
pkg.dependencies = {
  scuttlebot: version
}
pkg.version = version

require('fs').writeFileSync(require('path').join(__dirname, 'package.json'), JSON.stringify(pkg, null, 2))



