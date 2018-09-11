# pull-sink-through

convert a pull-stream sink (that takes a callback)
into a through steam that outputs a single item.
Useful when you have an api that needs to return a source
stream, but may be either a source or an async function.

Used by map-filter-reduce, because if a reduce is included
it's a sink with a callback.

``` js
function sum () {
  return SinkThrough(function (cb) {
    pull.reduce(function (a, b) {
      return a + b
    }, 0, cb)
  })
}

pull(
  pull.count(100),
  sum,
  pull.collect(function (err, ary) {
    console.log(ary) // => [5500]
  })
)
```


## License

MIT

