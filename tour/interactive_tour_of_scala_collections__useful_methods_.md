---
layout: tour
title: "Collections - useful methods"
code: |
  val list = List(5, 1, 4, 2, 3)

  //size and content checks
  list.size
  list.isEmpty
  list.contains(4)
  list.exists(_ > 4)

  //accessing parts of a collection
  list.head
  list.last
  list.take(2)
  list.drop(2)

  //sorting and ordering
  list.sorted
  list.reverse
  list.sortBy(x => -x)

  //aggregations
  list.sum
  list.max
  list.min
  list.mkString(", ")

  //transformations
  list.map(_ * 2)
  list.filter(_ > 2)
  list.groupBy(_ % 2)
  List(1, 1, 2, 3, 3).distinct
---

Scala collections come with a rich set of built-in methods; a few of the most useful ones are shown on the left.

- All of these methods return a new value and leave the original collection unchanged
- Most of them are available on all collection types (Lists, Arrays, Sets, Maps, etc.), not just Lists
- Try changing the code on the left and running it to explore them
