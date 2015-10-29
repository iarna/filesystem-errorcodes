'use strict'
var test = require('tap').test
var path = require('path')
var fs = require('fs')
var rimraf = require('rimraf')
var throws = require('./lib/throws.js')

var testdir = path.resolve(__dirname, 'rename')
var testfromdir = path.resolve(testdir, 'from')
var testexistsdir = path.resolve(testdir, 'exists')
var testnopermdir = path.resolve(testdir, 'noperm')
var testnopermsubdir = path.resolve(testnopermdir, 'sub')

function cleanup () {
  try { rimraf.sync(testdir) } catch (ex) {}
}

test('setup', function (t) {
  cleanup()
  fs.mkdirSync(testdir)
  fs.mkdirSync(testfromdir)
  fs.mkdirSync(testexistsdir)
  fs.mkdirSync(path.join(testexistsdir, 'stub'))
  fs.mkdirSync(testnopermdir)
  fs.chmodSync(testnopermdir, '555')
  t.end()
})

test('rename', function (t) {
  t.plan(2)
  throws(t, 'ENOTEMPTY', 'dest dir exists', function () {
    fs.renameSync(testfromdir, testexistsdir)
  })
  throws(t, 'EACCES', 'no permissions', function () {
    fs.renameSync(testfromdir, testnopermsubdir)
  })
})

test('cleanup', function (t) {
  cleanup()
  t.end()
})
