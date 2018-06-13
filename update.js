
var _pkg = require('scuttlebot/package.json')
var pkg = require('./package.json')

var version = process.argv[2]
var build = process.argv[3] || ''
pkg.devDependencies = _pkg.devDependencies
pkg.dependencies = {
  scuttlebot: version
}
pkg.version = version + build

require('fs').writeFileSync(require('path').join(__dirname, 'package.json'), JSON.stringify(pkg, null, 2))



