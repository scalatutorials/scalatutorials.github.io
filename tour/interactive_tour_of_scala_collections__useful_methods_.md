---
layout: tour
title: "Collections - useful methods"
code: |
  val list = List(5, 1, 4, 2, 3)

  //size and content checks
  list.size //> 5
  list.isEmpty //> false
  list.contains(4) //> true
  list.exists(_ > 4) //> true

  //accessing parts of a collection
  list.head //> 5
  list.last //> 3
  list.take(2) //> List(5, 1)
  list.drop(2) //> List(4, 2, 3)

  //sorting and ordering
  list.sorted //> List(1, 2, 3, 4, 5)
  list.reverse //> List(3, 2, 4, 1, 5)
  list.sortBy(x => -x) //> List(5, 4, 3, 2, 1)

  //aggregations
  list.sum //> 15
  list.max //> 5
  list.min //> 1
  list.mkString(", ") //> "5, 1, 4, 2, 3"

  //transformations
  list.map(_ * 2) //> List(10, 2, 8, 4, 6)
  list.filter(_ > 2) //> List(5, 4, 3)
  list.groupBy(_ % 2) //> Map(1 -> List(5, 1, 3), 0 -> List(4, 2))
  List(1, 1, 2, 3, 3).distinct //> List(1, 2, 3)
---

Scala collections come with a rich set of built-in methods; a few of the most useful ones are shown on the left.

- All of these methods return a new value and leave the original collection unchanged
- Most of them are available on all collection types (Lists, Arrays, Sets, Maps, etc.), not just Lists
- Try changing the code on the left and running it to explore them
