'use strict'
var test = require('tap').test
var path = require('path')
var fs = require('fs')
var throws = require('./lib/throws.js')

var testdir = path.resolve(__dirname, 'mkdir')

function cleanup () {
  try { fs.rmdirSync(testdir) } catch (ex) {}
}

test('setup', function (t) {
  cleanup()
  fs.mkdirSync(testdir)
  fs.chmodSync(testdir, '0000')
  t.end()
})

test('mkdir', function (t) {
  t.plan(2)
  throws(t, 'ENOENT', 'missing directory', function () {
    fs.mkdirSync(path.join('fakedir','nope'))
  })
  throws(t, 'EACCES', 'no permissions', function () {
    fs.mkdirSync(path.join(testdir, 'none'))
  })
})

test('cleanup', function (t) {
  cleanup()
  t.end()
})

