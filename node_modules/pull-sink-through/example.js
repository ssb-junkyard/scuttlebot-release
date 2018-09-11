var pull = require('pull-stream')
var SinkThrough = require('./')

function sum () {
  return SinkThrough(function (cb) {
    return pull.reduce(function (a, b) {
      return a + b
    }, 0, cb)
  })
}

pull(
  pull.count(100),
  sum(),
  pull.collect(function (err, ary) {
    console.log(ary) // => [5050]
  })
)

