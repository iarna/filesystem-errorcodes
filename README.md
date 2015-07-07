Filesystem Errorcodes
---------------------

### process.chdir(_dir_)

  * _dir_ does not exist
    * `ENOENT`
  * no permission to chdir to _dir_
    * `EACCES`

### fs.readdir(_dir_, cb)

  * _dir_ does not exist
    * `ENOENT`
  * no permission to read _dir_
    * `EACCES`

Assumptions
-----------

Currently these tests assume that sync and async functions will produce the
same error objects.  If this proves ever to not be true we'll split out the
tests.
