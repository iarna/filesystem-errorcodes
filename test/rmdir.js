'use strict'
var test = require('tap').test
var path = require('path')
var fs = require('fs')
var throws = require('./lib/throws.js')

var testdir = path.resolve(__dirname, 'rmdir')
var testsubdir = path.resolve(testdir, 'subdir')

function cleanup () {
  try { fs.chmodSync(testdir, '755') } catch (ex) {}
  try { fs.rmdirSync(testsubdir) } catch (ex) {}
  try { fs.rmdirSync(testdir) } catch (ex) {}
}

test('setup', function (t) {
  cleanup()
  fs.mkdirSync(testdir)
  fs.mkdirSync(testsubdir)
  fs.chmodSync(testdir, '555')
  t.end()
})

test('rmdir', function (t) {
  t.plan(2)
  throws(t, 'ENOENT', 'missing directory', function () {
    fs.rmdirSync('fakedir')
  })
  throws(t, 'EACCES', 'no permissions', function () {
    fs.rmdirSync(testsubdir)
  })
})

test('cleanup', function (t) {
  cleanup()
  t.end()
})

