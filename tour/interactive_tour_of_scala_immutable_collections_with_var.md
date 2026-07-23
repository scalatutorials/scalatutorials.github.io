---
layout: tour
title: "Immutable collections with var"
code: |
  import scala.collection.mutable

  var immutableSet = Set(1, 2, 3)

  immutableSet += 4
  //this is the same as:
  immutableSet = immutableSet + 4

  //compare to
  val mutableSet = mutable.Set(1, 2, 3)

  mutableSet += 4
  // this is the same as:
  mutableSet.+=(4)

  println(immutableSet)
  println(mutableSet)
---

One thing to note is the difference between the `+=`, `++=`, `-=`, `--=` etc. functions regarding mutable and immutable collections.

- For immutable collections - they are not methods of the collection (since it's not modifiable) but if used on an immutable collection declared with `var` instead of `val` then the Scala compiler expands them to `variable = variable op param` (see on the left for an example)
- For mutable collections - they are actually methods on the collection, and they modify the collection when used.
