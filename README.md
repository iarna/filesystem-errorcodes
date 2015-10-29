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

### fs.mkdir(_dir_, cb)

  * _dir_ does not exist
    * `ENOENT`
  * no permission to create _dir_
    * `EACCES`

### fs.rmdir(_dir_, cb)

  * _dir_ does not exist
    * `ENOENT`
  * no permission to remove _dir_
    * `EACCES`

### fs.rename(_from_, _to_, cb)

  * _from_ is a directory and to exists (WINDOWS)
    * `EPERM`
  * _from_ and _to_ are directories and _to_ contains files (NON-WINDOWS)
    * `ENOTEMPTY`
  * can't write to the parent folder of _to_ (WINDOWS)
    * `EPERM`
  * can't write to the parent folder of _to_ (NON-WINDOWS)
    * `EACCES`

Assumptions
-----------

Currently these tests assume that sync and async functions will produce the
same error objects.  If this proves ever to not be true we'll split out the
tests.
