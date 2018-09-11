
module.exports = function (create) {
  var reader = null
  return function (read) {
    if('function' !== typeof read) throw new Error('read must be function')
    return function (abort, cb) {
      if(abort) (reader ? reader.abort : read)(abort, cb)
      else if(!reader) (reader = create(cb))(read)
      else //there will only be one value, so assume this is the end
        cb(true)
    }
  }
}












