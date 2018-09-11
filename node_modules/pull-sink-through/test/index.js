var pull = require('pull-stream')
var tape = require('tape')
var SinkThrough = require('../')

tape('simple', function (t) {

  pull(
    pull.values([1,2,3]),
    SinkThrough(function (cb) {
      return pull.collect(cb)
    }),
    pull.collect(function (err, ary) {
      if(err) throw err
      t.deepEqual(ary, [[1,2,3]])
      t.end()
    })
  )

})

tape('abort after cb', function (t) {

  pull(
    pull.values([1,2,3]),
    SinkThrough(function (cb) {
      return pull.collect(cb)
    }),
    pull.find(function (err, ary) {
      if(err) throw err
      t.deepEqual(ary, [1,2,3])
      t.end()
    })
  )

})

tape('aborts upstream', function (t) {

  pull(
    pull.values([1,2,3]),
    SinkThrough(function (cb) {
      return pull.find(cb)
    }),
    pull.collect(function (err, ary) {
      if(err) throw err
      t.deepEqual(ary, [1])
      t.end()
    })
  )

})

tape('abort immediately', function (t) {

  pull(
    pull.values([1,2,3]),
    SinkThrough(function (cb) {
      t.ok(false, 'createSink should not be called')
    }),
    function (read) {
      read (true, function (end) {
        t.ok(end)
        t.end()
      })
    }
  )
})


tape('read then abort', function (t) {
  t.plan(3)
  pull(
    pull.values([1,2,3]),
    pull.asyncMap(function (d, cb) {
      setImmediate(function () { cb(null, d) })
    }),
    SinkThrough(function (cb) {
      return pull.collect(cb)
    }),
    function (read) {
      var ended = false
      read (null, function (end) {
        t.notOk(ended, 'read called first')
        ended = true
        t.ok(end, 'read got end signal')
      })
      read(new Error('abort!'), function (end) {
        t.ok(ended, 'read called back first')
        t.end()
      })
    }
  )
})

tape('read then abort, async', function (t) {
  t.plan(3)
  pull(
    pull.values([1,2,3]),
    pull.asyncMap(function (d, cb) {
      setTimeout(function () { cb(null, d) })
    }),
    SinkThrough(function (cb) {
      return pull.collect(cb)
    }),
    function (read) {
      var ended = false
      read (null, function (end) {
        t.notOk(ended, 'read called first')
        ended = true
        t.ok(end, 'read got end signal')
      })
      setImmediate(function () {
        read(new Error('abort!'), function (end) {
          t.ok(ended, 'read called back first')
          t.end()
        })
      })
    }
  )
})


