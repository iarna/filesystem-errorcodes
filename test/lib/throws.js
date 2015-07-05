'use strict'

module.exports = function(t, code, message, action) {
  try {
    action()
    t.fail(message)
  } catch (ex) {
    t.is(ex && ex.code, code, message)
  }
}
